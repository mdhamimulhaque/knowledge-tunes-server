"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var express = require('express');
var _a = require('mongodb'), MongoClient = _a.MongoClient, ServerApiVersion = _a.ServerApiVersion;
var cors = require('cors');
require("dotenv").config();
var app = express();
var port = 5000 || process.env.PORT;
// ---> middle ware
app.use(cors());
app.use(express.json());
// ---> database connection
var uri = "mongodb+srv://".concat(process.env.DB_USER, ":").concat(process.env.DB_USER_PASS, "@cluster0.76zc9vk.mongodb.net/?retryWrites=true&w=majority");
var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var postsCollection_1, usersCollection_1, commentsCollection_1;
    return __generator(this, function (_a) {
        try {
            postsCollection_1 = client.db("knowledgeTunes").collection("Posts");
            usersCollection_1 = client.db("knowledgeTunes").collection("Users");
            commentsCollection_1 = client.db("knowledgeTunes").collection("comments");
            // ---> test
            app.get('/', function (req, res) {
                res.send('server is running');
            });
            // ---> all post get
            app.get('/posts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var query, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = {};
                            return [4 /*yield*/, postsCollection_1.find(query).toArray()];
                        case 1:
                            result = _a.sent();
                            res.send(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            // ---> popular post
            app.get('/popular-posts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var query, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = { isPopular: true };
                            return [4 /*yield*/, postsCollection_1.find(query).toArray()];
                        case 1:
                            result = _a.sent();
                            res.send(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            // --->new post 
            app.post('/posts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var newPost, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            newPost = req.body;
                            return [4 /*yield*/, postsCollection_1.insertOne(newPost)];
                        case 1:
                            result = _a.sent();
                            res.send(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            // ---> post details  get
            app.get('/post/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var id, query, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = req.params.id;
                            query = { _id: new mongodb_1.ObjectId(id) };
                            return [4 /*yield*/, postsCollection_1.findOne(query)];
                        case 1:
                            result = _a.sent();
                            res.send(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            // ---> make popular post
            app.put('/posts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var id, filter, options, updateDoc, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = req.query.id;
                            filter = { _id: new mongodb_1.ObjectId(id) };
                            options = { upsert: true };
                            updateDoc = {
                                $set: {
                                    isPopular: true
                                },
                            };
                            return [4 /*yield*/, postsCollection_1.updateOne(filter, updateDoc, options)];
                        case 1:
                            result = _a.sent();
                            res.send(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            // ---> category get
            app.get('/category/:name', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var name, query, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            name = req.params.name;
                            query = { category: name };
                            return [4 /*yield*/, postsCollection_1.find(query).toArray()];
                        case 1:
                            result = _a.sent();
                            res.send(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            // ---> userinfo store
            app.put('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var users, query, findUser, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            users = req.body;
                            query = { email: users.email };
                            return [4 /*yield*/, usersCollection_1.findOne(query)];
                        case 1:
                            findUser = _a.sent();
                            if (findUser) {
                                return [2 /*return*/, res.send({ acknowledged: true })];
                            }
                            return [4 /*yield*/, usersCollection_1.insertOne(users)];
                        case 2:
                            result = _a.sent();
                            res.send(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            // ---> userinfo store
            app.get('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var query, users;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = {};
                            return [4 /*yield*/, usersCollection_1.find(query).toArray()];
                        case 1:
                            users = _a.sent();
                            res.send(users);
                            return [2 /*return*/];
                    }
                });
            }); });
            // ---> author post delete
            app.get('/author', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var email, query, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = req.query.email;
                            if (!(email != 'undefined')) return [3 /*break*/, 2];
                            query = { email: email };
                            return [4 /*yield*/, postsCollection_1.find(query).toArray()];
                        case 1:
                            result = _a.sent();
                            res.send(result);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
            // ---> author post update
            app.put('/author/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var id, updateData, filter, options, updateUserDoc, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = req.params.id;
                            updateData = req.body;
                            filter = { _id: new mongodb_1.ObjectId(id) };
                            options = { upsert: true };
                            updateUserDoc = {
                                $set: {
                                    title: updateData.title,
                                    description: updateData.description
                                },
                            };
                            return [4 /*yield*/, postsCollection_1.updateOne(filter, updateUserDoc, options)];
                        case 1:
                            result = _a.sent();
                            res.send(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            // ---> author post delete
            app.delete('/author/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var id, query, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = req.params.id;
                            query = { _id: new mongodb_1.ObjectId(id) };
                            return [4 /*yield*/, postsCollection_1.deleteOne(query)];
                        case 1:
                            result = _a.sent();
                            res.send(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            // ---> new comment
            app.post('/comments', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var newComment, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            newComment = req.body;
                            return [4 /*yield*/, commentsCollection_1.insertOne(newComment)];
                        case 1:
                            result = _a.sent();
                            res.send(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            // ---> get all comments category base
            app.get('/comments', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var category, query, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            category = req.query.category;
                            query = { category: category };
                            return [4 /*yield*/, commentsCollection_1.find(query).toArray()];
                        case 1:
                            result = _a.sent();
                            res.send(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            // ---> get all comments category base
            app.get('/all-comments', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var query, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = {};
                            return [4 /*yield*/, commentsCollection_1.find(query).toArray()];
                        case 1:
                            result = _a.sent();
                            res.send(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            // ---> author post delete
            app.delete('/comments/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                var id, query, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = req.params.id;
                            query = { _id: new mongodb_1.ObjectId(id) };
                            return [4 /*yield*/, commentsCollection_1.deleteOne(query)];
                        case 1:
                            result = _a.sent();
                            res.send(result);
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        finally { }
        return [2 /*return*/];
    });
}); };
run().catch(function (err) { return console.log(err); });
app.listen(port, function () {
    console.log('Knowledge Tunes server running from port', port);
});
