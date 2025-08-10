# **ChatGPT + GitHub DevOps Agent**

A Node.js application that combines **ChatGPT's intelligent planning** with **real GitHub API operations** to create an autonomous DevOps assistant. This script understands natural language requests and executes GitHub operations like listing repositories, creating branches, and managing issues.

## 🌟 **Features**

- 🧠 **Intelligent Planning**: Uses ChatGPT to understand and plan DevOps workflows
- 🔧 **Real GitHub Operations**: Direct GitHub API integration for repository management
- 📊 **Smart Pagination**: Automatically fetches ALL your repositories (not just the first 10)
- 🎯 **Natural Language Interface**: "Show me my repositories" → Automated execution
- 📝 **Intelligent Summaries**: ChatGPT provides human-friendly result summaries
- 🔄 **Dual Modes**: Interactive chat mode or single command execution
- ✅ **Windows Compatible**: Bypasses MCP stdio issues on Windows

## 📋 **Prerequisites**

Before running this script, ensure you have:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **OpenAI API Key** - [Get yours here](https://platform.openai.com/api-keys)
- **GitHub Personal Access Token** - [Create one here](https://github.com/settings/tokens)

## 🚀 **Installation**

### **Step 1: Clone or Download**
```bash
# Create project directory
mkdir chatgpt-github-agent
cd chatgpt-github-agent
```

### **Step 2: Initialize Project**
```bash
# Initialize npm project
npm init -y

# Install dependencies
npm install axios readline
```

### **Step 3: Configure ES Modules**
Edit your `package.json` to add ES module support:
```json
{
  "name": "chatgpt-github-agent",
  "version": "1.0.0",
  "type": "module",
  "description": "ChatGPT + GitHub DevOps Agent",
  "main": "simple-chatgpt-github.js",
  "scripts": {
    "start": "node simple-chatgpt-github.js --interactive",
    "test": "node simple-chatgpt-github.js \"show me my repositories\""
  },
  "dependencies": {
    "axios": "^1.0.0",
    "readline": "^1.0.0"
  }
}
```

### **Step 4: Create the Script**
Create `simple-chatgpt-github.js` and paste the complete script code provided in our conversation.

## 🔑 **API Keys Setup**

### **OpenAI API Key**
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in and create a new API key
3. Copy the key (starts with `sk-`)

### **GitHub Personal Access Token**
1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Set expiration and select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `read:user` (Read user profile data)
   - ✅ `workflow` (Update GitHub Action workflows)
4. Generate and copy the token (starts with `ghp_`)

### **Environment Variables (Recommended)**

**Windows (PowerShell):**
```powershell
# Set for current session
$env:OPENAI_API_KEY="sk-your-openai-key-here"
$env:GITHUB_TOKEN="ghp_your-github-token-here"

# Set permanently (optional)
[Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "sk-your-key", "User")
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp-your-token", "User")
```

**macOS/Linux (Bash):**
```bash
# Set for current session
export OPENAI_API_KEY="sk-your-openai-key-here"
export GITHUB_TOKEN="ghp_your-github-token-here"

# Set permanently (add to ~/.bashrc or ~/.zshrc)
echo 'export OPENAI_API_KEY="sk-your-key"' >> ~/.bashrc
echo 'export GITHUB_TOKEN="ghp_your-token"' >> ~/.bashrc
```

**Alternative: Edit the Script Directly**
If you prefer not to use environment variables, edit the config object in `simple-chatgpt-github.js`:
```javascript
this.config = {
    openaiApiKey: 'sk-your-actual-openai-key-here',
    githubToken: 'ghp_your-actual-github-token-here'
};
```

## 🎮 **Usage**

### **Interactive Mode (Recommended)**
```bash
node simple-chatgpt-github.js --interactive
```

**Example conversation:**
```
🎯 Enter your DevOps request: show me my recent repositories

🚀 ChatGPT + GitHub Integration
==================================================
🧠 ChatGPT Planning Phase
   Request: "show me my recent repositories"
✅ ChatGPT Plan:
   Reasoning: User wants to see their GitHub repositories
   Tasks: 1

⏳ Executing tasks...

🔧 Executing GitHub Tool: list_repositories
   Arguments: {"per_page": 100}
✅ GitHub API Success

✨ SUMMARY:
==================================================
Successfully retrieved your GitHub repositories! 
Found 23 repositories including projects in JavaScript, 
Python, and TypeScript. Your most recent repository 
"ai-devops-automation" was updated 2 days ago.
==================================================
```

### **Single Command Mode**
```bash
# List repositories
node simple-chatgpt-github.js "show me my repositories"

# Create a branch
node simple-chatgpt-github.js "create a branch called feature/ai-integration in my main project"

# List issues
node simple-chatgpt-github.js "show me open issues in my repositories"
```

### **Available Natural Language Commands**

| Command | What it does |
|---------|-------------|
| `"show me my repositories"` | Lists all your GitHub repositories with details |
| `"list my recent repos"` | Shows recently updated repositories |
| `"create a branch called feature/new-ui"` | Creates a new branch (requires repo specification) |
| `"show open issues in my project"` | Lists open issues (requires repo specification) |
| `"list issues in [repo-name]"` | Shows issues for a specific repository |

## 🛠 **Supported GitHub Operations**

- ✅ **List Repositories** - Get all your repos with pagination
- ✅ **Create Branches** - Create new branches from existing ones  
- ✅ **List Issues** - View open/closed issues in repositories
- 🔄 **Easily Extensible** - Add more GitHub API endpoints as needed

## 🔧 **Troubleshooting**

### **Common Issues**

**Error: "Cannot find module"**
```bash
# Make sure dependencies are installed
npm install axios readline
```

**Error: "API key not configured"**
```bash
# Check your environment variables
echo $OPENAI_API_KEY  # macOS/Linux
echo $env:OPENAI_API_KEY  # Windows PowerShell
```

**Error: "GitHub API rate limit"**
- Wait an hour for rate limit reset, or
- Use a GitHub Personal Access Token (higher rate limits)

**Error: "Repository not found"**
- Ensure your GitHub token has access to the repository
- Check repository name spelling
- Verify repository visibility (public vs private)

### **Windows-Specific Issues**

**PowerShell Execution Policy Error:**
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Node.js ES Modules Issues:**
- Ensure `package.json` has `"type": "module"`
- Use `.js` extension for the script file
- Use `import` statements instead of `require()`

## 📊 **Sample Output**

```
🚀 ChatGPT + GitHub Integration
==================================================
🧠 ChatGPT Planning Phase
   Request: "show me my repositories"
✅ ChatGPT Plan:
   Reasoning: To list all the user's repositories using the GitHub API
   Tasks: 1

⏳ Executing tasks...

🔧 Executing GitHub Tool: list_repositories
   Arguments: {}
🔍 Fetching ALL repositories with pagination...
   📄 Fetching page 1...
   ✅ Retrieved 100 repositories from page 1
   📄 Fetching page 2...
   ✅ Retrieved 23 repositories from page 2
🎯 Total repositories fetched: 123
✅ GitHub API Success

📊 Generating Summary...

✨ SUMMARY:
==================================================
Successfully retrieved all 123 of your GitHub repositories! 
Here's what I found:

• **Most Active Languages**: JavaScript (45 repos), Python (32 repos), 
  TypeScript (28 repos), HTML (18 repos)
• **Recent Activity**: Your most recently updated repository is 
  "ai-experiments" modified 3 days ago
• **Repository Types**: Mix of public and private repositories
• **Total Stars**: Your repositories have received 342 stars combined

Your development activity shows strong focus on web technologies 
and AI/ML projects. Keep up the great work!
==================================================
```

## 🚀 **Extending the Script**

To add more GitHub operations, extend the `githubTools` array and add corresponding methods:

```javascript
// Add to githubTools array
{
    name: "create_pull_request",
    description: "Create a pull request",
    parameters: {
        type: "object",
        properties: {
            owner: { type: "string" },
            repo: { type: "string" },
            title: { type: "string" },
            head: { type: "string" },
            base: { type: "string" }
        },
        required: ["owner", "repo", "title", "head", "base"]
    }
}

// Add corresponding method
async createPullRequest(headers, args) {
    const response = await axios.post(
        `https://api.github.com/repos/${args.owner}/${args.repo}/pulls`,
        {
            title: args.title,
            head: args.head,
            base: args.base,
            body: args.body || ""
        },
        { headers }
    );
    return {
        pull_request: {
            number: response.data.number,
            title: response.data.title,
            url: response.data.html_url
        }
    };
}
```

## 📝 **License**

This project is open source and available under the [MIT License](LICENSE).

## 🤝 **Contributing**

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🔗 **Related Projects**

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

## 💡 **Future Enhancements**

- 🔄 Add more GitHub operations (PRs, deployments, webhooks)
- 🌐 Support for other platforms (GitLab, Bitbucket)
- 🤖 Convert to full autonomous agent with iteration loops
- 📊 Add analytics and reporting features
- 🔒 Enhanced security and token management

***

**Made with ❤️ and powered by ChatGPT + GitHub API**
