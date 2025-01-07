const checkWeekday = (req, res, next) => {
    const today = new Date();
    const day = today.getDay();
  
    if (day === 0 || day === 6) { 
      return res.status(403).json({ message: "Acesso permitido apenas de segunda a sexta-feira." });
    }
  
    next();
  };
  
  module.exports = { checkWeekday };
  