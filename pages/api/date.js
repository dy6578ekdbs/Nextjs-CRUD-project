export default function handler(request, response) {
  if (request.method === 'GET') {
    let time = new Date();
    return response.status(200).json(time);
  }
}
