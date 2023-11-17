export default extensionName;

/**
 * A function that generates the function comment for a given function body.
 *
 * @param {Telegrambo} bot - the telegrambo instance
 * @param {type} firstArgument - description of the first argument
 * @param {type} secondArgument - description of the second argument
 * @return {undefined} no return value
 */
function extensionName(bot) {
  return (firstArgument, secondArgument) => {
    console.log({firstArgument, secondArgument});
  }
}