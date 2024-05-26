// const scrollContainer = document.body;


// scrollContainer.querySelectorAll('&>*').values()
//     .filter(el => el.querySelectorAll('span').values().find(el => el.innerText === 'Promoted'))
//     .forEach(el=>el.remove());

// [...scrollContainer.children]
//     .filter(el =>[...el.querySelectorAll('span')].find(el => el.innerText === 'Promoted'))
//     .forEach(el=>el.remove());    

const objects = [{ a: 1 }, { b: 1 }, { a: 1, b: 1 }, { a: 1 }, { b: 1 }, { b: 1, a: 1 },];

const uniqueObjects = new Set(objects.map(JSON.stringify)).values().toArray().map(JSON.parse);
const uniqueObjects2 = [...new Set(objects.map(JSON.stringify))].map(JSON.parse);

const uniqueObjects3 = new Set([{ a: 1, b: 1 }, { b: 1, a: 1 }]
    .map(JSON.stringify)).values().toArray().map(JSON.parse);
console.log(uniqueObjects3);

//

function setWithRange(start, stop, factor = 1) {
    return new Set(Array.from({ length: (stop - start) * factor }, (v, i) => start + i));
}
const MAX_SET_SIZE = Math.pow(2, 24);
let s = setWithRange(0, MAX_SET_SIZE);


console.log(setWithRange(10, 20));

function union(a, b) {
    return new Set([...a, ...b]);
}

function intersection(a, b) {
    return new Set(a.values().filter(v => b.has(v)));
}

function difference(a, b) {
    return new Set(a.values().filter(v => !b.has(v)));
}

function symmetricDifference(a, b) {
    return difference(union(a, b), intersection(a, b));
}

function isSubsetOf(a, b) {
    return a.values().every(v => b.has(v));
}

function isSupersetOf(a, b) {
    return isSubsetOf(b, a);
}

function equal(a, b) {
    return a.size === b.size && a.values().every(v => b.has(v));
}

const set1 = setWithRange(0, 3), set2 = setWithRange(2, 5);

const r1=set1.union(set2).values().reduce((t,v) => t+v,0);
console.log('r1',r1);
 
const r2=[...new Set([...set1,...set2])].reduce((t,v) => t+v,0);
console.log('r2',r2);


const f = MAX_SET_SIZE / 4;

const a = setWithRange(0, 2, f),
    b = setWithRange(1, 3, f),
    c = setWithRange(1, 2, f);

function measure(func) {
    const start = Date.now();
    const r = func();
    return { time: Date.now() - start, r };
}

function compare(func1, func2) {
    const { time: t1, r: r1 } = measure(func1);
    const { time: t2, r: r2 } = measure(func2);
    const same = r1 instanceof Set ? equal(r1, r2) : r1 === r2;
    if (!same) throw 'Not equal';
    return ` custom/built-in time=${t1}/${t2}`;
}


console.log([
    ["a subset of a",
        compare(() => isSubsetOf(a, a), () => a.isSubsetOf(a))],
    ["c subset of a",
        compare(() => isSubsetOf(c, a), () => c.isSubsetOf(a))],
    ["a subset of b",
        compare(() => isSubsetOf(a, b), () => a.isSubsetOf(b))],

    ["a superset of a",
        compare(() => isSupersetOf(a, a), () => a.isSupersetOf(a))],
    ["a superset of c",
        compare(() => isSupersetOf(a, c), () => a.isSupersetOf(c))],
    ["a superset of b",
        compare(() => isSupersetOf(a, b), () => a.isSupersetOf(b))],
 
    ["union of a and b",
        compare(() => union(a, b), () => a.union(b))],

    ["intersection of a and b",
        compare(() => intersection(a, b), () => a.intersection(b))],

    ["difference of a and b",
        compare(() => difference(a, b), () => a.difference(b))],
    ["difference of b and a",
        compare(() => difference(b, a), () => b.difference(a))],

    ["symmetricDifference of a is and b",
        compare(() => symmetricDifference(a, b), () => a.symmetricDifference(b))]

].join('\n'));
