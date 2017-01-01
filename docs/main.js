function IntToDozen(i) {
  return i.toString(12).replace(/a/g, "X").replace(/b/g, "E");
}

function DozenToInt(d) {
  return parseInt(d.replace(/X/g, "a").replace(/E/g, "b"), 12);
}

function createProblem(scale) {
  let randoms = [0, 0, 0].map(() => Math.random());
  if (randoms[0] * 3 < 1) {
    randoms = randoms.map(i => Math.ceil(i * Math.pow(12, scale)));
    return [IntToDozen(randoms[1]) + " + " + IntToDozen(randoms[2]) + " = ?", IntToDozen(randoms[1] + randoms[2])];
  } else if (randoms[0] * 3 < 2) {
    randoms = randoms.map(i => Math.ceil(i * 2 * Math.pow(12, scale)));
    return [IntToDozen(randoms[1]) + " - " + IntToDozen(randoms[2]) + " = ?", IntToDozen(randoms[1] - randoms[2])];
  } else {
    randoms = randoms.map(i => Math.ceil(i * Math.pow(12, scale)));
    return [IntToDozen(randoms[1]) + " * " + IntToDozen(randoms[2]) + " = ?", IntToDozen(randoms[1] * randoms[2])];
  }

  return randoms;
}

window.onload = function (e) {
  var problem = document.getElementById('problem'),
    ans = document.getElementById('ans'),
    sender = document.getElementById('send'),
    next = document.getElementById('next'),
    judge = document.getElementById('judge'),
    rater = document.getElementById('rate'),
    answer = null,
    level = 1,
    result = {
      right: 0,
      answer: 0,
      rate: 1
    };

  next.disabled = true;
  ans.focus();

  [problem.innerHTML, answer] = createProblem(level);

  sender.onclick = function (e) {
    result.answer++;
    if (answer === ans.value) {
      result.right++;
      judge.innerHTML = "OK";
      next.disabled = false;
      sender.disabled = true;
    } else {
      judge.innerHTML = "NG";
    }
    result.rate = result.right / result.answer;
    rater.innerHTML = IntToDozen(result.right) + " / " + IntToDozen(result.answer);
  };

  next.onclick = function (e) {
    if (result.right >= level * 12 && result.rate > 5 / 6) {
      level++;
    }
    [problem.innerHTML, answer] = createProblem(level);
    judge.innerHTML = "";
    ans.value = "";
    ans.focus();
    sender.disabled = false;
    next.disabled = true;
  };
};
