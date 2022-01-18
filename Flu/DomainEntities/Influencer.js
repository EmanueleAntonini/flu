class Influencer {
    constructor(name,surname,fullName,twitterUsername,twitterParams,gNewsScore,twitterScore,fluScore) { 
        this.name=name;
        this.surname=surname;
        this.fullName=fullName;
        this.twitterUsername=twitterUsername;
        this.twitterParams=twitterParams;
        this.gNewsScore=gNewsScore;
        this.twitterScore=twitterScore;
        this.fluScore=fluScore
    };
}

module.exports = {Influencer};