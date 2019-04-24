
/**
 * Decompose given rupiah to be minimum number of rupiahs needed
 * to make that amount
 * @param {array} availableRupiah - Currently available nominal of rupiah
 * @param {number} inputRupiah - Rupiah to decompose
 * @returns {object} `availableRupiah` that used and `left` is exist
 */
export const calcuateDecomposeRupiah = (inputRupiah) => {
  let i = 0,
      left = '',
      availableRupiah = [
        { nominal: 100000, count: 0 },
        { nominal: 50000, count: 0 },
        { nominal: 20000, count: 0 },
        { nominal: 10000, count: 0 },
        { nominal: 5000, count: 0 },
        { nominal: 2000, count: 0 },
        { nominal: 1000, count: 0 },
        { nominal: 500, count: 0 },
        { nominal: 100, count: 0 },
        { nominal: 50, count: 0 },
      ]

  while(inputRupiah !== 0) {

    // Condition when inputRupiah < 50 (minimum available rupiah)
    if (i === availableRupiah.length) {
      left = `Rp${inputRupiah}`
      break
    }

    const currNominal = availableRupiah[i].nominal
    if (inputRupiah >= currNominal) {
      let div = Math.floor(inputRupiah / currNominal)
      div = (div === 0) ? 1 : div
      
      inputRupiah -= (currNominal * div)
      
      if (inputRupiah === 0)
        availableRupiah[i].count = div
      else
        availableRupiah[i].count += div
    }

    i++
  }

  return { availableRupiah, left }
}