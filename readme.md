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
- 🐳 **Docker MCP Integration**: Optional advanced MCP server setup for enhanced capabilities

## 📋 **Prerequisites**

Before running this script, ensure you have:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **OpenAI API Key** - [Get yours here](https://platform.openai.com/api-keys)
- **GitHub Personal Access Token** - [Create one here](https://github.com/settings/tokens)
- **Docker** (optional, for MCP server setup) - [Download here](https://www.docker.com/products/docker-desktop/)

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
    "test": "node simple-chatgpt-github.js \"show me my repositories\"",
    "mcp-test": "docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN=%GITHUB_TOKEN% ghcr.io/github/github-mcp-server"
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
   - ✅ `read:packages` (Download packages from GitHub Package Registry)
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

## 🐳 **Docker + GitHub MCP Server Setup (Advanced)**

For enhanced capabilities and compatibility with MCP protocol, you can set up the official GitHub MCP server via Docker.

### **What is GitHub MCP Server?**

The GitHub MCP (Model Context Protocol) Server is GitHub's official implementation that provides:
- Standardized protocol for AI-GitHub integration
- Enhanced security and authentication
- Broader tool support (60+ GitHub operations)
- Compatibility with multiple AI clients (Claude, VS Code, etc.)
- Real-time GitHub API access

### **Docker Installation**

#### **Step 1: Install Docker**
- **Windows/Mac**: [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Linux**: [Docker Engine](https://docs.docker.com/engine/install/)

Verify installation:
```bash
docker --version
docker ps
```

#### **Step 2: Pull GitHub MCP Server Image**
```bash
# Pull the official GitHub MCP server
docker pull ghcr.io/github/github-mcp-server

# Verify the image
docker images | grep github-mcp-server
```

#### **Step 3: Test GitHub MCP Server**
```bash
# Test with your GitHub token
docker run -i --rm \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your-token-here \
  ghcr.io/github/github-mcp-server
```

**Expected Output:**
```
GitHub MCP Server running on stdio
```

## 🎮 **Usage**

### **Method 1: Simple Mode (Direct GitHub API - Recommended)**

This method bypasses Docker and connects directly to GitHub's API. It's simpler and works on all platforms.

#### **Interactive Mode**
```bash
# Set your API keys
export OPENAI_API_KEY="sk-your-openai-key-here"  # macOS/Linux
export GITHUB_TOKEN="ghp_your-github-token-here"

# Windows PowerShell:
$env:OPENAI_API_KEY="sk-your-openai-key-here"
$env:GITHUB_TOKEN="ghp_your-github-token-here"

# Run interactive mode
node simple-chatgpt-github.js --interactive
```

#### **Single Command Mode**
```bash
# List repositories
node simple-chatgpt-github.js "show me my repositories"

# Create a branch
node simple-chatgpt-github.js "create a branch called feature/ai-integration in my main project"

# List issues
node simple-chatgpt-github.js "show me open issues in my repositories"
```

### **Method 2: Advanced Mode (Docker MCP Server)**

This method uses the official GitHub MCP server running in Docker for enhanced capabilities.

#### **Step 1: Start Docker MCP Server (Terminal 1)**

**Open your first terminal/command prompt and run:**

**Windows (PowerShell):**
```powershell
# Make sure Docker Desktop is running first
docker --version

# Start the GitHub MCP Server
docker run -i --rm `
  -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your-github-token-here `
  ghcr.io/github/github-mcp-server
```

**macOS/Linux (Bash):**
```bash
# Make sure Docker is running first
docker --version

# Start the GitHub MCP Server
docker run -i --rm \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your-github-token-here \
  ghcr.io/github/github-mcp-server
```

**Expected Output in Terminal 1:**
```
Unable to find image 'ghcr.io/github/github-mcp-server:latest' locally
latest: Pulling from github/github-mcp-server
[...download progress...]
GitHub MCP Server running on stdio
```

> **Important**: Keep this terminal running! The MCP server needs to stay active for your Node.js script to connect to it.

#### **Step 2: Run Your Node.js Script (Terminal 2)**

**Open a second terminal/command prompt and navigate to your project directory:**

**Windows (PowerShell):**
```powershell
# Navigate to your project
cd C:\path\to\your\chatgpt-github-agent

# Set your API keys
$env:OPENAI_API_KEY="sk-your-openai-key-here"
$env:GITHUB_TOKEN="ghp_your-github-token-here"

# Run the script
node simple-chatgpt-github.js --interactive
```

**macOS/Linux (Bash):**
```bash
# Navigate to your project
cd /path/to/your/chatgpt-github-agent

# Set your API keys
export OPENAI_API_KEY="sk-your-openai-key-here"
export GITHUB_TOKEN="ghp_your-github-token-here"

# Run the script
node simple-chatgpt-github.js --interactive
```

#### **Step 3: Test the Integration**

In Terminal 2, you should see:
```
🚀 Script starting...
Node.js version: v22.18.0
Arguments: [...]
✅ All imports successful
📍 Entering main() function
🧠 ChatGPT Planning Phase
...
```

#### **Step 4: Using MCP Inspector (Optional Testing)**

For advanced testing and debugging, you can use the MCP Inspector:

**Terminal 3 (Optional):**
```bash
# Install MCP Inspector globally
npm install -g @modelcontextprotocol/inspector

# Start MCP Inspector
npx @modelcontextprotocol/inspector
```

Then open `http://localhost:6274` and configure:
- **Transport Type**: `stdio`
- **Command**: `docker`
- **Arguments**: `run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your-token ghcr.io/github/github-mcp-server`

### **Sample Workflow (Docker Mode)**

Here's what your complete workflow looks like:

```bash
# Terminal 1: Start MCP Server
$ docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xyz123 ghcr.io/github/github-mcp-server
GitHub MCP Server running on stdio
# Keep this running...

# Terminal 2: Run your script
$ cd /your/project/directory
$ export OPENAI_API_KEY="sk-your-key"
$ export GITHUB_TOKEN="ghp_xyz123"
$ node simple-chatgpt-github.js --interactive

🎯 Enter your DevOps request: show me my repositories

🚀 ChatGPT + GitHub Integration
==================================================
🧠 ChatGPT Planning Phase
   Request: "show me my repositories"
✅ ChatGPT Plan:
   Reasoning: User wants to see their GitHub repositories
   Tasks: 1

⏳ Executing tasks...

🔧 Executing GitHub Tool: list_repositories
🔍 Fetching ALL repositories with pagination...
   📄 Fetching page 1...
   ✅ Retrieved 100 repositories from page 1
   📄 Fetching page 2...
   ✅ Retrieved 23 repositories from page 2
🎯 Total repositories fetched: 123
✅ GitHub API Success

✨ SUMMARY:
==================================================
Successfully retrieved all 123 of your GitHub repositories!
Your most active languages are JavaScript (45 repos), 
TypeScript (32 repos), and Python (28 repos). 
Your latest repository "ai-experiments" was updated 3 days ago.
==================================================

🎯 Enter your DevOps request: quit
```

### **Available Natural Language Commands**

| Command | What it does |
|---------|-------------|
| `"show me my repositories"` | Lists all your GitHub repositories with details |
| `"list my recent repos"` | Shows recently updated repositories |
| `"create a branch called feature/new-ui in my-repo"` | Creates a new branch (specify repo name) |
| `"show open issues in my project"` | Lists open issues (requires repo specification) |
| `"list issues in [repo-name]"` | Shows issues for a specific repository |
| `"create an issue in [repo-name] about [topic]"` | Creates a new issue (with MCP server) |
| `"show my pull requests"` | Lists your pull requests (with MCP server) |
| `"quit"` or `"exit"` | Exit the interactive mode |

### **GitHub MCP Server Configuration Options**

#### **Basic Configuration**
```bash
docker run -i --rm \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your-token \
  ghcr.io/github/github-mcp-server
```

#### **Advanced Configuration with Toolsets**
```bash
# Enable specific toolsets only
docker run -i --rm \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your-token \
  -e GITHUB_TOOLSETS="repos,issues,pull_requests,code_security" \
  ghcr.io/github/github-mcp-server

# Enable all toolsets
docker run -i --rm \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your-token \
  -e GITHUB_TOOLSETS="all" \
  ghcr.io/github/github-mcp-server
```

#### **GitHub Enterprise Server Setup**
```bash
docker run -i --rm \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your-token \
  -e GITHUB_HOST="https://github.your-company.com" \
  ghcr.io/github/github-mcp-server
```

### **Available Toolsets**

| Toolset | Description | Example Tools |
|---------|-------------|---------------|
| `repos` | Repository operations | `list_files`, `create_branch`, `get_commits` |
| `issues` | Issue management | `create_issue`, `list_issues`, `add_comment` |
| `users` | User information | `get_user`, `list_followers` |
| `pull_requests` | PR operations | `create_pull_request`, `merge_pr`, `review_pr` |
| `code_security` | Security features | `list_security_alerts`, `get_vulnerabilities` |
| `experiments` | Beta features | Cutting-edge GitHub integrations |

### **Environment Variables Reference**

| Variable | Description | Example |
|----------|-------------|---------|
| `GITHUB_PERSONAL_ACCESS_TOKEN` | **Required** GitHub PAT | `ghp_1234567890abcdef` |
| `GITHUB_HOST` | GitHub server URL | `https://github.com` |
| `GITHUB_TOOLSETS` | Enabled toolsets | `repos,issues,pull_requests` |
| `OPENAI_API_KEY` | **Required** OpenAI API key | `sk-1234567890abcdef` |

## 🛠 **Supported GitHub Operations**

### **Direct API Mode (Built-in)**
- ✅ **List Repositories** - Get all your repos with pagination
- ✅ **Create Branches** - Create new branches from existing ones  
- ✅ **List Issues** - View open/closed issues in repositories
- 🔄 **Easily Extensible** - Add more GitHub API endpoints as needed

### **MCP Server Mode (Docker)**
- ✅ **Repository Management** - Full CRUD operations on repos
- ✅ **Issue Tracking** - Create, update, comment on issues
- ✅ **Pull Request Workflow** - Create, review, merge PRs
- ✅ **Branch Operations** - Create, delete, merge branches
- ✅ **File Operations** - Read, create, update repository files
- ✅ **Security Features** - Access security alerts and vulnerabilities
- ✅ **User Management** - Access user and organization data
- ✅ **Advanced Search** - Complex GitHub searches and filtering

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

### **Docker-Specific Issues**

**Docker not found:**
```bash
# Check Docker installation
docker --version
# If not installed, download Docker Desktop
```

**GitHub MCP Server connection failed:**
```bash
# Test Docker access
docker run hello-world

# Test GitHub MCP server manually
docker run -i --rm \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your-token \
  ghcr.io/github/github-mcp-server
```

**Permission denied (Windows):**
```powershell
# Run PowerShell as Administrator
# Ensure Docker Desktop is running
```

**Image pull failed:**
```bash
# Login to GitHub Container Registry (if needed)
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin

# Pull image manually  
docker pull ghcr.io/github/github-mcp-server
```

**Container exits immediately:**
```bash
# Check if your GitHub token is valid
curl -H "Authorization: token ghp_your-token" https://api.github.com/user

# Verify token has required scopes (repo, read:packages)
```

**"GitHub MCP Server running on stdio" then nothing:**
- This is normal! The server is waiting for connections
- Keep Terminal 1 running and use Terminal 2 for your Node.js script
- The server only responds when your script connects to it

### **Windows-Specific Issues**

**PowerShell Execution Policy Error:**
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Node.js ES Modules Issues:**
- Ensure `package.json` has `"type": "module"`
- Use `.js` extension for the script file
- Use `import` statements instead of `require()`

**MCP Server stdio Issues:**
- Use Docker mode instead of direct stdio connection
- Ensure Docker Desktop is running before starting containers

## 📊 **Sample Output**

### **Simple Mode Output**
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

### **MCP Mode Output**
```
🐳 GitHub MCP Server running on stdio

Available Tools: 63 tools discovered
✅ Repository Tools: list_files, create_branch, get_commits
✅ Issue Tools: create_issue, list_issues, add_comment  
✅ PR Tools: create_pull_request, merge_pr, review_pr
✅ Security Tools: list_security_alerts, get_vulnerabilities

🎯 Ready for advanced GitHub operations via MCP protocol!
```

## 🚀 **Quick Start Commands**

### **For Beginners (Simple Mode)**
```bash
# 1. Set up project
mkdir chatgpt-github-agent && cd chatgpt-github-agent
npm init -y
npm install axios readline

# 2. Set API keys
export OPENAI_API_KEY="sk-your-key"
export GITHUB_TOKEN="ghp_your-token"

# 3. Create and run script
# (Paste the script content into simple-chatgpt-github.js)
node simple-chatgpt-github.js "show me my repositories"
```

### **For Advanced Users (Docker Mode)**
```bash
# Terminal 1: Start MCP Server
docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your-token ghcr.io/github/github-mcp-server

# Terminal 2: Run Node.js script
export OPENAI_API_KEY="sk-your-key" && export GITHUB_TOKEN="ghp_your-token"
node simple-chatgpt-github.js --interactive
```

## 🔗 **Related Projects**

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)
- [GitHub MCP Server](https://github.com/github/github-mcp-server)
- [Docker MCP Servers](https://github.com/docker/mcp-servers)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)

## 💡 **Future Enhancements**

### **Near Term**
- 🔄 Add more GitHub operations (PRs, deployments, webhooks)
- 🌐 Support for other platforms (GitLab, Bitbucket)
- 📊 Enhanced analytics and reporting features
- 🔒 Improved security and token management

### **Long Term**
- 🤖 Convert to full autonomous agent with iteration loops
- 🧠 Multi-step workflow automation
- 📈 Advanced GitHub analytics and insights  
- 🔌 Plugin system for custom integrations
- 🌍 Multi-organization support
- 📱 Web interface and mobile support

***

**Made with ❤️ and powered by ChatGPT + GitHub API + Docker MCP**
