const users = [
  { name: "abd", username: "abdabd2003", id: "1", password: "12" },
  { name: "jon", username: "jon123", id: "2", password: "12" },
  { name: "ahamd", username: "heheniggaboy", id: "3", password: "12" },
  { name: "nigga", username: "sometxt", id: "4", password: "12" },
];

function getUserinfo(id) {
  return users.find((user) => user.id === id); // Find user by ID
}

function newUser(name, username, password) {
  const user = users.find((user) => user.username === username);

  if (user) {
    return undefined; // Username is not available
  }

  let newUserinfo = {
    name: name,
    username: username,
    id: (users.length + 1).toString(),
    password: password,
  };
  console.log(users);
  users.push(newUserinfo);
  return newUserinfo;
}

function updateUserinfo(name, username, password) {
  const user = users.find((user) => user.username === username);
  if (!user) {
    return undefined;
  }
  if (name === user.name && password === user.password) {
    return undefined;
  }
  user.name = name;
  user.password = password;
  console.log(user);
  console.log(users);
  return 1;
}

module.exports = { getUserinfo, newUser, updateUserinfo };
