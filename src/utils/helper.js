exports._errorFormatter = (errors) => {
  let res = [];

  for (let i = 0; i < errors.length; i++) {
    res.push(errors[i].msg);
  }

  return res.join('. ');
};
