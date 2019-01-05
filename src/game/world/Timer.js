class Timer {

    constructor(props) {
        props = Object.assign({delay: 10}, props);

        this.time = 0;

        const thisClass = this;
        this.interval = setInterval(function () {
            thisClass.time = thisClass.time + props.delay;
        }, props.delay);
    }

    getTime() {
        return this.time;
    }

}

export default Timer