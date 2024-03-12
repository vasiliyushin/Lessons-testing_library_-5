//урок 7

const scores = {
  Anna: 10,
  Olga: 1,
  Ivan: 5,
  Vasiliy: 25
};

const getScore = (student) => {
  let sumScores = 0;
  for (let key in student) {
    sumScores = sumScores + student[key]
  }
  console.log(sumScores)  
}

getScore(scores)
