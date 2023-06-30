export default class UserInfo {
  constructor(configInfo) {
    this._profileName = document.querySelector(configInfo.name);
    this._profileJob = document.querySelector(configInfo.job);
    this._profileAvatar = document.querySelector(configInfo.avatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }

  setUserInfo({name, job, avatar}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }

  setUserAvatar(avatar) {
    this._profileAvatar.src = avatar;
    
  }
}