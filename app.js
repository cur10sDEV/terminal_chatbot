import openai from "./config/openai.js";
import colors from "colors";
import readlineSync from "readline-sync";

const main = async () => {
  console.log(colors.bold.green("\nWelcome to Commandline ChatBot!"));
  console.log(colors.bold.green("You can start chatting with the bot.\n"));

  // stores chat history
  const chatHistory = [];

  while (true) {
    try {
      const userInput = readlineSync.question(colors.yellow("You 😎: "));

      // constructing chat history messages array for the bot to understand the context of the conversation
      const messages = chatHistory.map((msg) => msg);

      // adding user input to messages
      messages.push({ role: "user", content: userInput });

      // exit condition
      if (userInput.toLowerCase() === "exit") {
        console.log(
          colors.bold.magenta("\nThank You for using the chatbot! 🙏")
        );
        return;
      }

      // create chat completion
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      const completionText = completion.data.choices[0].message.content;
      console.log(colors.cyan(`Bot 🤖: ${completionText}\n`));

      // update chat history with user input and bot's response
      chatHistory.push({ role: "user", content: userInput });
      chatHistory.push({ role: "assistant", content: completionText });
    } catch (error) {
      console.error(colors.red(error));
    }
  }
};

main();
