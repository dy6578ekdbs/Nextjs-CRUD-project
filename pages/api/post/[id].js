export default async function handler(request, response) {
  // http://localhost:3000/api/post/12 를 쓰면 화면에 {id:12}라는 json 출력됨
  return response.status(200).json(request.query);
}
