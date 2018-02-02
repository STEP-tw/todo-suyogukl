const getTimeInSecond = ()=>new Date().getTime();
class SessionManager {
  constructor (sessionIdGenerator=getTimeInSecond,sessions){
    this.sessionIdGenerator=sessionIdGenerator;
    this.sessions = sessions||{};
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
  toJson(){
    return JSON.stringify(this.sessions,null,2);
  }
}

module.exports = SessionManager;
