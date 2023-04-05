import { ClientConfig, Pool } from "pg";

const pgConfig: ClientConfig = {
  host: process.env.NEXT_PUBLIC_PG_HOST || "",
  port: Number(process.env.NEXT_PUBLIC_PG_PORT) || 1234,
  user: process.env.NEXT_PUBLIC_PG_USER || "",
  password: process.env.NEXT_PUBLIC_PG_PASSWORD || "",
  database: process.env.NEXT_PUBLIC_PG_DATABASE || "",
  ssl: Boolean(process.env.NEXT_PUBLIC_PG_SSL) || false,
};

const pgConnect = new Pool(pgConfig);

export default pgConnect;
