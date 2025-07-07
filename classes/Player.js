export default class Player {
    constructor(name, id, lowestTime) {
        this.id = id
        this.name = name
        this.times = []
        this.lowestTime = lowestTime
    }
    addTime(time) {
        this.times.push(time)
    }
    showStats() {
        const total = this.totalTime();
        const avg = this.averageTime(total);
        console.log(`\nGreat job, ${this.name}!
Total time: ${total} seconds
Average per riddle: ${(avg / 1000).toFixed(2)} seconds`);
    }

    totalTime() {
        let totalTime = 0;
        this.times.forEach(time => totalTime += time);
        return Math.round(totalTime / 1000);
    }

    averageTime(totalTime) {
        if (this.times.length === 0) return 0;
        return (totalTime * 1000) / this.times.length;
    }

    showBestTime() {
        console.log(this.lowestTime);

    }


}
