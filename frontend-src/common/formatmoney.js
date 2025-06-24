function formatMoney(amount, {
    signNegative = false,
    signPositive = false,
    decimalZeros = false
} = {}) {
    const isNegative = amount < 0;
    const isPositive = amount > 0;
    const absAmount = Math.abs(amount);
    const hasDecimals = !Number.isInteger(absAmount);

    // Determine prefix
    let prefix = '';
    if (isNegative && signNegative) {
        prefix = '-';
    } else if (isPositive && signPositive) {
        prefix = '+';
    }

    // Format number
    let formatted;
    if (hasDecimals || decimalZeros) {
        formatted = absAmount.toFixed(2);
    } else {
        formatted = Math.round(absAmount).toString();
    }

    return `${prefix}$${formatted}`;
}

export default formatMoney;