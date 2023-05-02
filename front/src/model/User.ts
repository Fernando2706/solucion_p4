export interface User {
    _id:       string;
    name:      string;
    email:     string;
    password:  string;
    cart:      string[];
    createdAt: Date;
    __v:       number;
}
