const server = Bun.serve({
  async fetch() {
    const response = await fetch(`https://
api.openweathermap.org/data/2.5/forecast?id=524901&appid=${Bun.env.API_KEY}
    `);
    const res = await response.text();
    // const res = await Bun.readableStreamToJSON(response);
    return new Response(res);
  },
  port: 3000,
});
