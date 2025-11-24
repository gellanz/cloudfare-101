import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));
app.get("/random_color", (c) => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return c.json({ color: `rgb(${red}, ${green}, ${blue})` });
})

app.get("/customers", async (c) => {
    const customers = await c.env.spring_d1.prepare("SELECT * FROM Customers").all();
    return c.json(customers.results);
})

export default app;
