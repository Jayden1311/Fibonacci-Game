// Check if input is perfect square
export function isPerfectSquare(n) {
    const sqrt = Math.sqrt(n);
    return sqrt * sqrt === n && n > 0 && Math.sqrt(n) % 1 === 0;
}