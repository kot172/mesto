export default class UserInfo {
    constructor(configInfo) {
        this._profileName = document.querySelector(configInfo.name);
        this._profileJob = document.querySelector(configInfo.job);
    }

    getUserInfo() {
        return { name: this._profileName.textContent, job: this._profileJob.textContent }
    }

    setUserInfo(dataUser) {
        this._profileName.textContent = dataUser.name;
        this._profileJob.textContent = dataUser.job;
    }
}