import { cors } from 'hono/cors';
import { authRouter } from './routers/auth.router';
import { Hono } from 'hono';
import { tasksRouter } from './routers/tasks.router';


const app = new Hono();


app.use("*", cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
}));

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

app.route('/auth', authRouter)
app.route('/tasks', tasksRouter)

app.get('/todos', (c) => {
    return c.json([
        { id: 1, title: 'Todo 1' },
        { id: 2, title: 'Todo 2' },
        { id: 3, title: 'Todo 3' },
    ])
})

export default {
    port: 8080,
    fetch: app.fetch,
}