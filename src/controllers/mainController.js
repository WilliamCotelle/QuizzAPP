const { Quiz,Question, User, Tag , Level, Answer} = require("../models/index");

const mainController = {
  renderHomePage: async (req, res) => {
    try {
      const quizzes = await Quiz.findAll({
       order: [['title', 'ASC']],
        include: [
          {
            model: User,
            as: "author"
          },
          {
            model: Tag,
            as: "tags"
          }
        ],
        
      });
      res.render("home", { quizzes });
    } catch (error) {
      res.render('500');
      console.log(error);
    }
  },
  renderQuizPage : async (req,res)=>{
    try {
      const quizId = parseInt(req.params.id)
      const quiz = await Quiz.findByPk(quizId, {
        include: [
          {
            model: User,
            as: "author"
          },
         
          { model: Tag, 
            as: "tags" },
          {
            model: Question,
            as: "questions",
            include: [
              { model: Level, 
                as: "level" },
              {
                model: Answer,
                as: "propositions"
              }
            ]
          }
          
        ]
      });
      if(!quiz){
        res.render("404")
      }
      res.render("quiz", { quiz });
      
    } catch (error) {
      res.render('500');      
      console.log(error);
    }

  },

  renderTagsPage: async (req, res) =>{
    try {
      const tags = await Tag.findAll({
        include: {
          model: Quiz,
          as: "quizzes"
        }
      });
      res.render("tags", {tags})
    } catch (error) {
      res.render('500');;
      console.log(error);
    }
  }
};





module.exports = mainController; 
