import Cookies from "cookies";
import httpProxy, { ProxyResCallback } from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "method not supported" });
  }

  return new Promise((resolve) => {
    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";

      proxyRes.on("data", (chunk) => {
        body += chunk;
      });

      proxyRes.on("end", () => {
        const { accessToken, expiredAt } = JSON.parse(body);

        const cookies = new Cookies(req, res, {
          secure: process.env.NODE_ENV !== "development",
        });
        cookies.set("access_token", accessToken, {
          httpOnly: true,
          sameSite: "lax",
          expires: new Date(expiredAt),
        });

        try {
          (res as NextApiResponse)
            .status(200)
            .json({ message: "login successfully" });
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: "something went wrong" });
        }
      });
    };

    proxy.once("proxyRes", handleLoginResponse);
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    });
  });
}
