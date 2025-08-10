// simple-chatgpt-github.js
import axios from 'axios';
import readline from 'readline';

class ChatGPTGitHubAgent {
    constructor() {
        this.config = {
            openaiApiKey:'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',
            githubToken:'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'
        };
        
        // GitHub API tools
        this.githubTools = [
            {
                name: "list_repositories",
                description: "List user repositories",
                parameters: {
                    type: "object",
                    properties: {
                        per_page: { type: "integer", maximum: 100, default: 10 }
                    }
                }
            },
            {
                name: "create_branch",
                description: "Create a new branch",
                parameters: {
                    type: "object",
                    properties: {
                        owner: { type: "string" },
                        repo: { type: "string" },
                        branch_name: { type: "string" },
                        from_branch: { type: "string", default: "main" }
                    },
                    required: ["owner", "repo", "branch_name"]
                }
            },
            {
                name: "list_issues",
                description: "List repository issues",
                parameters: {
                    type: "object",
                    properties: {
                        owner: { type: "string" },
                        repo: { type: "string" },
                        state: { type: "string", enum: ["open", "closed", "all"], default: "open" }
                    },
                    required: ["owner", "repo"]
                }
            }
        ];
    }

    // Step 1: ChatGPT Planning
    async planWithChatGPT(userRequest) {
        console.log('🧠 ChatGPT Planning Phase');
        console.log(`   Request: "${userRequest}"`);

        const systemPrompt = `You are a DevOps automation assistant with access to GitHub tools.

Available GitHub Tools:
${JSON.stringify(this.githubTools.map(t => ({name: t.name, description: t.description})), null, 2)}

Analyze the user request and create a step-by-step plan using these GitHub tools.

Respond with ONLY a JSON object:
{
  "reasoning": "Brief explanation of the plan",
  "tasks": [
    {
      "tool": "exact_tool_name",
      "description": "What this accomplishes",
      "arguments": {"param": "value"}
    }
  ]
}`;

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-4o',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userRequest }
                    ],
                    response_format: { type: 'json_object' },
                    temperature: 0.1
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.config.openaiApiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const plan = JSON.parse(response.data.choices[0].message.content);
            console.log('✅ ChatGPT Plan:');
            console.log(`   Reasoning: ${plan.reasoning}`);
            console.log(`   Tasks: ${plan.tasks.length}`);
            
            return plan;
        } catch (error) {
            console.error('❌ ChatGPT Planning Error:', error.message);
            throw error;
        }
    }

    // Step 2: Execute GitHub API calls directly
    async executeGitHubTool(toolName, args) {
        console.log(`🔧 Executing GitHub Tool: ${toolName}`);
        console.log(`   Arguments: ${JSON.stringify(args)}`);

        const headers = {
            'Authorization': `token ${this.config.githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'ChatGPT-GitHub-Agent'
        };

        try {
            let result;
            switch (toolName) {
                case 'list_repositories':
                    result = await this.listRepositories(headers, args);
                    break;
                case 'create_branch':
                    result = await this.createBranch(headers, args);
                    break;
                case 'list_issues':
                    result = await this.listIssues(headers, args);
                    break;
                default:
                    throw new Error(`Unknown tool: ${toolName}`);
            }

            console.log('✅ GitHub API Success');
            return {
                success: true,
                tool: toolName,
                result: result
            };
        } catch (error) {
            console.error(`❌ GitHub API Error: ${error.message}`);
            return {
                success: false,
                tool: toolName,
                error: error.message
            };
        }
    }

    // GitHub API implementations
    async listRepositories(headers, args) {
        const response = await axios.get(
            `https://api.github.com/user/repos?per_page=${args.per_page || 100}&sort=updated`,
            { headers }
        );
        return {
            repositories: response.data.map(repo => ({
                name: repo.name,
                full_name: repo.full_name,
                language: repo.language,
                stars: repo.stargazers_count,
                updated_at: repo.updated_at
            }))
        };
    }

    async createBranch(headers, args) {
        // Get the SHA of the source branch
        const refResponse = await axios.get(
            `https://api.github.com/repos/${args.owner}/${args.repo}/git/ref/heads/${args.from_branch}`,
            { headers }
        );
        
        const sha = refResponse.data.object.sha;
        
        // Create new branch
        const createResponse = await axios.post(
            `https://api.github.com/repos/${args.owner}/${args.repo}/git/refs`,
            {
                ref: `refs/heads/${args.branch_name}`,
                sha: sha
            },
            { headers }
        );
        
        return {
            branch: {
                name: args.branch_name,
                sha: createResponse.data.object.sha,
                url: `https://github.com/${args.owner}/${args.repo}/tree/${args.branch_name}`
            },
            message: `Successfully created branch '${args.branch_name}' from '${args.from_branch}'`
        };
    }

    async listIssues(headers, args) {
        const response = await axios.get(
            `https://api.github.com/repos/${args.owner}/${args.repo}/issues?state=${args.state || 'open'}`,
            { headers }
        );
        return {
            issues: response.data.map(issue => ({
                number: issue.number,
                title: issue.title,
                state: issue.state,
                created_at: issue.created_at
            }))
        };
    }

    // Step 3: ChatGPT Summary
    async summarizeWithChatGPT(originalRequest, results) {
        console.log('📊 Generating Summary...');

        const summaryPrompt = `Summarize this DevOps automation execution in a friendly, informative way:

Original Request: "${originalRequest}"

Results: ${JSON.stringify(results, null, 2)}

Provide a clear, user-friendly summary of what was accomplished.`;

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-4o',
                    messages: [{ role: 'user', content: summaryPrompt }],
                    temperature: 0.3,
                    max_tokens: 400
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.config.openaiApiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const summary = response.data.choices[0].message.content;
            console.log('\n✨ SUMMARY:');
            console.log('='.repeat(50));
            console.log(summary);
            console.log('='.repeat(50));
            
        } catch (error) {
            console.log('📝 Summary: Tasks completed successfully!');
        }
    }

    // Main workflow
    async executeRequest(userRequest) {
        console.log('\n🚀 ChatGPT + GitHub Integration');
        console.log('='.repeat(50));

        try {
            // Step 1: Plan with ChatGPT
            const plan = await this.planWithChatGPT(userRequest);
            
            console.log('\n⏳ Executing tasks...\n');

            // Step 2: Execute GitHub operations
            const results = [];
            for (const task of plan.tasks) {
                const result = await this.executeGitHubTool(task.tool, task.arguments);
                results.push({
                    task: task.description,
                    ...result
                });
                
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            // Step 3: Summarize with ChatGPT
            await this.summarizeWithChatGPT(userRequest, results);

            return { success: true, plan, results };

        } catch (error) {
            console.error('\n❌ Execution failed:', error.message);
            return { success: false, error: error.message };
        }
    }

    // Interactive mode
    async runInteractive() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log('\n🤖 ChatGPT + GitHub DevOps Agent');
        console.log('Example requests:');
        console.log('• "Show me my recent repositories"');
        console.log('• "List open issues in my main repository"');
        console.log('• "Create a branch called feature/ai-test in my repo"');
        console.log('\nType "quit" to exit\n');

        const askQuestion = () => {
            rl.question('🎯 Enter your DevOps request: ', async (input) => {
                if (input.toLowerCase() === 'quit') {
                    rl.close();
                    return;
                }

                if (input.trim()) {
                    await this.executeRequest(input);
                    console.log('\n' + '─'.repeat(60) + '\n');
                }
                
                askQuestion();
            });
        };

        askQuestion();
    }
}

// Main execution
async function main() {
    const agent = new ChatGPTGitHubAgent();
    
    // Validate config
    if (agent.config.openaiApiKey === 'YOUR_OPENAI_API_KEY_HERE' || 
        agent.config.githubToken === 'YOUR_GITHUB_TOKEN_HERE') {
        console.log('❌ Please set your API keys:');
        console.log('   export OPENAI_API_KEY="your-key"');
        console.log('   export GITHUB_TOKEN="your-token"');
        process.exit(1);
    }

    const args = process.argv.slice(2);
    
    if (args.length > 0 && args[0] !== '--interactive') {
        // Single request mode
        const request = args.join(' ');
        await agent.executeRequest(request);
    } else {
        // Interactive mode
        await agent.runInteractive();
    }
}

main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
