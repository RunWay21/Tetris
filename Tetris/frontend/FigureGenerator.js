export function getFigure() {
    let choice = Math.round((Math.random() * 6));
    switch (choice) {
        case 0: return getJFigure({ x: 5, y: 0 });
        case 1: return getLFigure({ x: 5, y: 0 });
        case 2: return getIFigure({ x: 5, y: 0 });
        case 3: return getEFigure({ x: 5, y: 0 });
        case 4: return getOFigure({ x: 5, y: 0 });
        case 5: return getZFigure({ x: 5, y: 0 });
        case 6: return getSFigure({ x: 5, y: 0 });
    }
}

function getJFigure(startPoint) {
    let points = [
        { x: startPoint.x, y: startPoint.y },
        { x: startPoint.x + 1, y: startPoint.y },
        { x: startPoint.x + 1, y: startPoint.y - 1 },
        { x: startPoint.x + 1, y: startPoint.y - 2 }
    ];
    return {
        points,
        center: points[1],
        type: 'J'
    };
}

function getLFigure(startPoint) {
    let points = [
        { x: startPoint.x, y: startPoint.y },
        { x: startPoint.x - 1, y: startPoint.y },
        { x: startPoint.x - 1, y: startPoint.y - 1 },
        { x: startPoint.x - 1, y: startPoint.y - 2 }
    ];
    return {
        points,        
        center: points[1],
        type: 'L'
    }
}

function getIFigure(startPoint) {
    let points = [
        { x: startPoint.x, y: startPoint.y },
        { x: startPoint.x, y: startPoint.y - 1 },
        { x: startPoint.x, y: startPoint.y - 2 },
        { x: startPoint.x, y: startPoint.y - 3 }
    ];
    return {
        points,
        center: points[1],
        type: 'I'
    }
}

function getOFigure(startPoint) {
    let points = [
        { x: startPoint.x, y: startPoint.y },
        { x: startPoint.x + 1, y: startPoint.y },
        { x: startPoint.x + 1, y: startPoint.y - 1 },
        { x: startPoint.x, y: startPoint.y - 1 }
    ];
    return {
        points,
        center: points[1],
        type: 'O'
    }
}

function getZFigure(startPoint) {
    let points = [
        { x: startPoint.x, y: startPoint.y },
        { x: startPoint.x - 1, y: startPoint.y },
        { x: startPoint.x - 1, y: startPoint.y - 1 },
        { x: startPoint.x - 2, y: startPoint.y - 1 }
    ];
    return {
        points,
        center: points[1],
        type: 'Z'
    }
}

function getSFigure(startPoint) {
    let points = [
        { x: startPoint.x, y: startPoint.y },
        { x: startPoint.x + 1, y: startPoint.y },
        { x: startPoint.x + 1, y: startPoint.y - 1 },
        { x: startPoint.x + 2, y: startPoint.y - 1 }
    ];
    return {
        points,
        center: points[1],
        type: 'S'
    }
}

function getEFigure(startPoint) {
    let points = [
        { x: startPoint.x, y: startPoint.y },
        { x: startPoint.x, y: startPoint.y - 1 },
        { x: startPoint.x + 1, y: startPoint.y - 1 },
        { x: startPoint.x, y: startPoint.y - 2 }
    ];
    return {
        points,
        center: points[1],
        type: 'E'
    }
}