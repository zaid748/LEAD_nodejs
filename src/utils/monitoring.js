const monitoring = {
    logQueryTime: (operation, startTime) => {
        const endTime = process.hrtime(startTime);
        console.log(`${operation} tomó ${endTime[0]}s ${endTime[1]/1000000}ms`);
    },
    
    requestLogger: (req, res, next) => {
        const start = Date.now();
        res.on('finish', () => {
            const duration = Date.now() - start;
            console.log(`${req.method} ${req.url} - ${duration}ms`);
        });
        next();
    }
};

module.exports = monitoring; 