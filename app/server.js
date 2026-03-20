import express from "express";
import client from "prom-client";

const app = express();
const port = process.env.PORT || 3000;

// Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
});

app.get("/", (req, res) => {
  httpRequestCounter.inc();
  res.send("Hello DevOps 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
