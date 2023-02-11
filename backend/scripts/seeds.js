//TODO: seeds script should come here, so we'll be able to put some data in our local env

const mongoose = require("mongoose");

const connection = process.env.MONGODB_URI;
mongoose.connect(connection);


const User = mongoose.model("User", new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true
    },
    bio: String,
    image: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    hash: String,
    salt: String
  },
  { timestamps: true }
));

const Item = mongoose.model("Item", new mongoose.Schema(
  {
    slug: { type: String, lowercase: true, unique: true },
    title: String,
    description: String,
    image: String,
    favoritesCount: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    tagList: [{ type: String }],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
));
const Comment = mongoose.model("Comment", new mongoose.Schema(
  {
    body: String,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }
  },
  { timestamps: true }
));

async function seedDatabase() {
  for (let i = 0; i < 100; i++) {
    // add user
    const user = { username: `user${i}`, email: `user${i}@gmail.com` };
    const options = { upsert: true, new: true };
    const createdUser = await User.findOneAndUpdate(user, {}, options);
    
    // add item to user
    const item = {
      slug: `slug${i}`,
      title: `title ${i}`,
      description: `description ${i}`,
      seller: createdUser,
    };
    const createdItem = await Item.findOneAndUpdate(item, {}, options);
    
    // add comments to item
    if (!createdItem?.comments?.length) {
      let commentIds = [];
      for (let j = 0; j < 100; j++) {
        const comment = new Comment({
          body: `body ${j}`,
          seller: createdUser,
          item: createdItem,
        });
        await comment.save();
        commentIds.push(comment._id);
      }
      createdItem.comments = commentIds;
      await createdItem.save();
    }
  }
}

seedDatabase()
  .then(() => {
  console.log("Finished DB seeding");
  process.exit(0);
})
.catch((err) => {
  console.log(`Error while running DB seed: ${err.message}`);
  process.exit(1);
});