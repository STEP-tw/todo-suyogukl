const getTimeInSecond = ()=>new Date().getTime();
class SessionManager {
  constructor (sessionIdGenerator=getTimeInSecond){
    this.sessionIdGenerator=sessionIdGenerator;
    this.sessions = {};
  }
  createSession(userName){
    let sessionId = this.sessionIdGenerator();
    this.sessions[sessionId] = userName;
    return sessionId;
  }
  getUserBySessionId(sessionId){
    return this.sessions[sessionId];
  }
  deleteSession(sessionId){
    let user = this.getUserBySessionId(sessionId);
    if (user) return delete this.sessions[sessionId];
    return false;
  }
  isLoggedIn(sessionId){
    return sessionId in this.sessions;
  }
}

module.exports = SessionManager;
