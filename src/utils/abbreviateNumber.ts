export function abbreviateNumber(value: number): string {
  let result = ''
  if (value >= 1000) {
    const suffixes = ['', 'k', 'm', 'b', 't']
    const suffixNum = Math.floor(('' + value).length / 3)
    let shortValue = 0
    for (let precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum !== 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      )
      console.log(shortValue)

      const dotLessShortValue = (shortValue + '').replace(
        /[^a-zA-Z 0-9]+/g,
        ''
      )
      if (dotLessShortValue.length <= 2) {
        break
      }
    }
    result = shortValue.toString() + suffixes[suffixNum]
  }

  return result
}
