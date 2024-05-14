async function convertCurrencies() {
    const amount = document.getElementById('amount').value;
    const fromCurrencies = Array.from(document.getElementById('fromCurrencies').selectedOptions).map(option => option.value);
    const toCurrencies = Array.from(document.getElementById('toCurrencies').selectedOptions).map(option => option.value);
    const apiKey = '690ce3e959ae6c23d69bbef1';  // ここに自分のAPIキーを入れる
    const results = [];

    for (let fromCurrency of fromCurrencies) {
        const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            for (let toCurrency of toCurrencies) {
                const rate = data.rates[toCurrency];
                const result = amount * rate;
                results.push(`${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`);
            }
        } catch (error) {
            console.error('Error:', error);
            results.push(`換算中にエラーが発生しました: ${fromCurrency}から${toCurrency}`);
        }
    }
    document.getElementById('result').innerHTML = results.join('<br>');
}
