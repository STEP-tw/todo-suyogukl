class Fs {
  constructor (content) {
    this.content = content;
  }
  readFileSync(path){
    return this.content;
  }
  existsSync(path){
    return true;
  }
}

module.exports = Fs;
