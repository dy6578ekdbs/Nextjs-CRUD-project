import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://dy6578ekdbs:wjdek22@cluster0.puiew4o.mongodb.net/';
const options = { useNewUrlParser: true };
let connectDB;

// 재실행 막기
//  "개발중 상태면 global이라는 전역변수 저장소에 보관해주세요"
if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  // 프로덕션 상태일 땐 global을 사용안하는게 좋음(프로덕션 상태일 땐 중복실행될 일이 별로 없음)
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
