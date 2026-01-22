
import { PROTO_PATHS } from "@mario-teacinema/contracts";
import * as fs from 'fs';

console.log("Path:", PROTO_PATHS.AUTH);
try {
    const stats = fs.statSync(PROTO_PATHS.AUTH);
    console.log("File exists:", stats.isFile());
} catch (e) {
    console.log("File does not exist:", e.message);
}
