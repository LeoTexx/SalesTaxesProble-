import { Router } from "express";

const router = Router();

const data1 = "2 book at 12.49 1 music CD at 14.99 1 chocolate bar at 0.85";
const data2 =
  "1 imported box of chocolates at 10.00 1 imported bottle of perfume at 47.50";
const data3 =
  "1 imported bottle of perfume at 27.99 1 bottle of perfume at 18.99 1 packet of headache pills at 9.75 3 box of imported chocolates at 11.25";

/*
 Convert the string into an array with the multiplier, the sentence, the price and an empty string
 Then, we merge into separate arrays containing the info of each order 
 Example: 
 Before:"1 imported box of chocolates at 10.00 1 imported bottle of perfume at 47.50"
 After: ["1 imported box of chocolates at 10.00","1 imported bottle of perfume at 47.50"]
 */
export function standardizeString(str: string) {
  let inputArray = str
    .match(/[\d\.]+|\D+/g)
    .filter((word) => {
      return word !== " ";
    })
    .slice(0);
  let standardArray = [];
  for (var i = 0, len = inputArray.length; i < len; i += 3)
    standardArray.push(inputArray.slice(i, i + 3));
  return standardArray;
}
//Check if the word "imported" is included in the string
export function isImported(str: string) {
  return str.includes("imported");
}

//Check if the words "chocolate(s), pill(s) or book(s)" are in the string
export function isException(str: string) {
  return /chocolate|chocolates|pill|pills|book|books/.test(str);
}

//Here we handle the math to determine the total price ant the taxes payed
export function getTaxes(str: string) {
  var totalTaxes = 0.0;
  var totalPrice = 0.0;
  var output: Array<string> = [];
  standardizeString(str).forEach((array) => {
    let multipliers = parseInt(array[0], 10);
    let sentences = array[1];
    let unitPrice = parseFloat(array[2]);
    let taxPercentage = 0;
    let taxes = 0;
    isImported(sentences) ? (taxPercentage += 5) : null;
    !isException(sentences) ? (taxPercentage += 10) : null;
    taxes = parseFloat(((unitPrice * taxPercentage) / 100).toFixed(2));
    let priceWithTaxes = (
      ((unitPrice + taxes) * multipliers * 100) /
      100
    ).toFixed(2);
    totalPrice += parseFloat(priceWithTaxes);
    totalTaxes += taxes;
    output.push(`<br/>${multipliers}${sentences}: ${priceWithTaxes}`);
  });
  output.push(`<br/>Sales Taxes: ${totalTaxes}`);
  output.push(`<br/>Total: ${totalPrice}`);
  return output;
}

router.get("/1", (req, res) => {
  res.send(`Input 1:${getTaxes(data1)}`);
});
router.get("/2", (req, res) => {
  res.send(`Input 2:${getTaxes(data2)}`);
});
router.get("/3", (req, res) => {
  res.send(`Input 3:${getTaxes(data3)}`);
});
router.get("/", (req, res) => {
  res.send(`All Input:${[getTaxes(data1), getTaxes(data2), getTaxes(data3)]}}`);
});
export default router;
