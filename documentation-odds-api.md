> ## Documentation Index
> Fetch the complete documentation index at: https://docs.odds-api.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction

> Real-time sports betting odds API with data from 250+ bookmakers across 10+ sports. Build odds comparison sites, value bet finders, and arbitrage tools.

# Welcome to Odds-API.io

Odds-API.io is a sports betting odds API with real-time data from over 250 bookmakers across 10+ sports.

## Key Features

<CardGroup cols={2}>
  <Card title="250+ Bookmakers" icon="building">
    Access odds from the world's largest selection of bookmakers including Bet365, Unibet, SingBet, and more.
  </Card>

  <Card title="10+ Sports" icon="futbol">
    Football, Basketball, Tennis, Esports, and many more.
  </Card>

  <Card title="Near-Zero Latency" icon="bolt">
    Real-time odds updates with minimal delay.
  </Card>

  <Card title="99.9% Uptime" icon="circle-check">
    Built for production use. We keep things running.
  </Card>
</CardGroup>

## What You Can Build

<CardGroup cols={2}>
  <Card title="Odds Comparison Sites" icon="chart-line">
    Build odds comparison platforms for your users.
  </Card>

  <Card title="Value Bet Finders" icon="magnifying-glass-dollar">
    Identify and alert users to profitable betting opportunities.
  </Card>

  <Card title="Betting Analytics" icon="chart-mixed">
    Build analytics and prediction tools on top of real odds data.
  </Card>

  <Card title="Live Betting Apps" icon="mobile">
    Create real-time betting applications with live odds feeds.
  </Card>
</CardGroup>

## Getting Started

<CardGroup cols={2}>
  <Card title="Quickstart Guide" icon="rocket" href="/quickstart">
    Get up and running with your first API call in minutes.
  </Card>

  <Card title="Authentication" icon="key" href="/authentication">
    Learn how to authenticate your API requests.
  </Card>

  <Card title="API Reference" icon="code" href="/api-reference/introduction">
    Explore all available endpoints and parameters.
  </Card>

  <Card title="Best Practices" icon="lightbulb" href="/guides/best-practices">
    Learn how to optimize your API usage and performance.
  </Card>
</CardGroup>

## API Coverage

What's included:

* **Pre-match odds** - Full market coverage for upcoming events
* **Live odds** - Real-time in-play betting odds
* **Multiple markets** - ML, Asian Handicap, Over/Under, and more
* **Period scores** - Scores for every period (e.g. half-time, 90min, overtime), enabling complete market settlement
* **Direct bet links** - Deep links directly to bookmaker bet slips
* **Value bets** - Automatically calculated expected value opportunities
* **Historical data** - Access to past odds and results

## Try It Now

See how easy it is to fetch odds data:

<CodeGroup>
  ```bash cURL theme={null}
  curl "https://api.odds-api.io/v3/sports"
  ```

  ```javascript JavaScript theme={null}
  const response = await fetch('https://api.odds-api.io/v3/sports');
  const sports = await response.json();
  console.log(sports);
  ```

  ```python Python theme={null}
  import requests

  response = requests.get('https://api.odds-api.io/v3/sports')
  sports = response.json()
  print(sports)
  ```
</CodeGroup>

<Tip>
  This endpoint doesn't require authentication - try it right now!
</Tip>

## Pricing & Free Tier

Get started with our **free tier** - no credit card required:

* **5,000 requests/hour** on all plans
* Add **10K/20K/30K** additional requests packages
* Custom enterprise solutions available
* Cancel anytime

<Card title="Get Started Free" icon="rocket" href="https://odds-api.io/#pricing">
  Get your API key in 30 seconds
</Card>

## Support

Need help? We're here for you:

* **Email Support**: [hello@odds-api.io](mailto:hello@odds-api.io)
* **Documentation**: Guides and full API reference right here
* **Response Time**: Usually within 24 hours


> ## Documentation Index
> Fetch the complete documentation index at: https://docs.odds-api.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Quickstart

> Get started with Odds-API.io in 5 minutes. Sign up for free, get your API key, and make your first call to fetch real-time betting odds.

## Make your first API call

Get up and running with Odds-API.io and fetch your first odds data.

### Step 1: Get your API key

<Steps>
  <Step title="Sign up for free">
    Visit [odds-api.io](https://odds-api.io) and sign up for a free account.
  </Step>

  <Step title="Check your email">
    Your API key will be sent to the email address you provided during signup.
  </Step>

  <Step title="Copy your API key">
    Copy the API key from the email and keep it secure!
  </Step>
</Steps>

<Warning>
  Never share your API key publicly or commit it to version control. Use environment variables to store it securely.
</Warning>

### Step 2: Fetch available sports

Let's start by fetching the list of available sports.

<Note>
  The `/sports` endpoint doesn't require authentication - you can try it before getting your API key!
</Note>

<CodeGroup>
  ```bash cURL theme={null}
  curl "https://api.odds-api.io/v3/sports"
  ```

  ```javascript JavaScript theme={null}
  const response = await fetch('https://api.odds-api.io/v3/sports');
  const sports = await response.json();
  console.log(sports);
  ```

  ```python Python theme={null}
  import requests

  response = requests.get('https://api.odds-api.io/v3/sports')
  sports = response.json()
  print(sports)
  ```

  ```php PHP theme={null}
  <?php
  $response = file_get_contents('https://api.odds-api.io/v3/sports');
  $sports = json_decode($response, true);
  print_r($sports);
  ```
</CodeGroup>

**Example Response:**

```json theme={null}
[
  {
    "name": "Football",
    "slug": "football"
  },
  {
    "name": "Basketball",
    "slug": "basketball"
  },
  {
    "name": "Tennis",
    "slug": "tennis"
  }
]
```

### Step 3: Fetch events for a sport

Now let's get upcoming football events:

<CodeGroup>
  ```bash cURL theme={null}
  curl "https://api.odds-api.io/v3/events?apiKey=YOUR_API_KEY&sport=football&limit=10"
  ```

  ```javascript JavaScript theme={null}
  const apiKey = process.env.ODDS_API_KEY;
  const response = await fetch(
    `https://api.odds-api.io/v3/events?apiKey=${apiKey}&sport=football&limit=10`
  );
  const events = await response.json();
  console.log(events);
  ```

  ```python Python theme={null}
  import requests
  import os

  api_key = os.environ['ODDS_API_KEY']
  response = requests.get(
      'https://api.odds-api.io/v3/events',
      params={
          'apiKey': api_key,
          'sport': 'football',
          'limit': 10
      }
  )
  events = response.json()
  print(events)
  ```

  ```php PHP theme={null}
  <?php
  $apiKey = getenv('ODDS_API_KEY');
  $url = 'https://api.odds-api.io/v3/events?' . http_build_query([
      'apiKey' => $apiKey,
      'sport' => 'football',
      'limit' => 10
  ]);
  $response = file_get_contents($url);
  $events = json_decode($response, true);
  print_r($events);
  ```
</CodeGroup>

**Example Response:**

```json theme={null}
[
  {
    "id": 123456,
    "sport": {
      "name": "Football",
      "slug": "football"
    },
    "league": {
      "name": "Premier League",
      "slug": "england-premier-league"
    },
    "home": "Manchester United",
    "away": "Liverpool",
    "date": "2025-10-15T15:00:00Z",
    "status": "settled",
    "scores": {
      "home": 2,
      "away": 1,
      "periods": {
        "p1": { "home": 1, "away": 0 },
        "ft": { "home": 2, "away": 1 }
      }
    }
  }
]
```

<Note>
  The `scores` object includes the final result (`home`/`away`, OT/penalty-inclusive) along with a `periods` map. Period keys: `p1`…`pN` (periods/sets/quarters), `ft` (full time), `ot` (overtime/extra time), `ap` (penalty shootout), `currentgame` (live tennis), `map1`…`mapN` (esports). The full-time key is `ft` (the legacy feed used `fulltime`).
</Note>

### Step 4: Get odds for an event

Finally, let's fetch odds from multiple bookmakers for a specific event:

<CodeGroup>
  ```bash cURL theme={null}
  curl "https://api.odds-api.io/v3/odds?apiKey=YOUR_API_KEY&eventId=123456&bookmakers=Bet365,Unibet,SingBet"
  ```

  ```javascript JavaScript theme={null}
  const apiKey = process.env.ODDS_API_KEY;
  const eventId = 123456;
  const bookmakers = 'Bet365,Unibet,SingBet';

  const response = await fetch(
    `https://api.odds-api.io/v3/odds?apiKey=${apiKey}&eventId=${eventId}&bookmakers=${bookmakers}`
  );
  const odds = await response.json();
  console.log(odds);
  ```

  ```python Python theme={null}
  import requests
  import os

  api_key = os.environ['ODDS_API_KEY']
  event_id = 123456
  bookmakers = 'Bet365,Unibet,SingBet'

  response = requests.get(
      'https://api.odds-api.io/v3/odds',
      params={
          'apiKey': api_key,
          'eventId': event_id,
          'bookmakers': bookmakers
      }
  )
  odds = response.json()
  print(odds)
  ```

  ```php PHP theme={null}
  <?php
  $apiKey = getenv('ODDS_API_KEY');
  $eventId = 123456;
  $bookmakers = 'Bet365,Unibet,SingBet';

  $url = 'https://api.odds-api.io/v3/odds?' . http_build_query([
      'apiKey' => $apiKey,
      'eventId' => $eventId,
      'bookmakers' => $bookmakers
  ]);
  $response = file_get_contents($url);
  $odds = json_decode($response, true);
  print_r($odds);
  ```
</CodeGroup>

**Example Response:**

```json theme={null}
{
  "id": 123456,
  "home": "Manchester United",
  "away": "Liverpool",
  "date": "2025-10-15T15:00:00Z",
  "status": "pending",
  "urls": {
    "Bet365": "https://www.bet365.com/...",
    "Unibet": "https://www.unibet.com/...",
    "SingBet": "https://www.unibet.com/..."
  },
  "bookmakers": {
    "Bet365": [
      {
        "name": "ML",
        "odds": [
          {
            "home": "2.10",
            "draw": "3.40",
            "away": "3.20"
          }
        ],
        "updatedAt": "2025-10-04T10:30:00Z"
      }
    ],
    "Unibet": [
      {
        "name": "ML",
        "odds": [
          {
            "home": "2.15",
            "draw": "3.35",
            "away": "3.15"
          }
        ],
        "updatedAt": "2025-10-04T10:29:45Z"
      }
    ],
    "SingBet": [
      {
        "name": "ML",
        "odds": [
          {
            "home": "2.00",
            "draw": "3.25",
            "away": "3.25"
          }
        ],
        "updatedAt": "2025-10-04T10:29:42Z"
      }
    ]
  }
}
```

## Common Use Cases

Here are quick snippets for common scenarios:

### Find Best Odds for a Match

```javascript theme={null}
// Compare odds across bookmakers
const bestOdds = {};
Object.entries(odds.bookmakers).forEach(([bookmaker, markets]) => {
  const ml = markets.find(m => m.name === 'ML')?.odds[0];
  if (ml) {
    if (!bestOdds.home || parseFloat(ml.home) > parseFloat(bestOdds.home.odds)) {
      bestOdds.home = { bookmaker, odds: ml.home };
    }
  }
});

console.log(`Best home odds: ${bestOdds.home.odds} at ${bestOdds.home.bookmaker}`);
```

### Filter Events by League

```javascript theme={null}
const apiKey = process.env.ODDS_API_KEY;

// Get Premier League matches only
const response = await fetch(
  `https://api.odds-api.io/v3/events?apiKey=${apiKey}&sport=football&league=england-premier-league`
);

const matches = await response.json();
console.log(`Found ${matches.length} Premier League matches`);
```

### Get Live Events

```javascript theme={null}
const apiKey = process.env.ODDS_API_KEY;

// Fetch events that are currently in play
const response = await fetch(
  `https://api.odds-api.io/v3/events?apiKey=${apiKey}&sport=football&status=live`
);

const liveMatches = await response.json();
console.log(`${liveMatches.length} matches currently live`);
```

## Error Handling

Always handle errors gracefully in production:

```javascript theme={null}
async function fetchOdds(eventId) {
  const apiKey = process.env.ODDS_API_KEY;

  try {
    const response = await fetch(
      `https://api.odds-api.io/v3/odds?apiKey=${apiKey}&eventId=${eventId}&bookmakers=Bet365`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key');
      }
      if (response.status === 429) {
        throw new Error('Rate limit exceeded - please wait before retrying');
      }
      if (response.status === 404) {
        throw new Error(`Event ${eventId} not found`);
      }
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch odds:', error.message);
    throw error;
  }
}
```

## Next steps

Now that you've made your first API calls, explore these guides:

<CardGroup cols={2}>
  <Card title="SDKs & Libraries" icon="code" href="/guides/sdks">
    Official Python, Node.js, and MCP SDKs for faster integration.
  </Card>

  <Card title="Fetching Odds" icon="chart-line" href="/guides/fetching-odds">
    Deep dive into fetching and comparing odds from multiple bookmakers.
  </Card>

  <Card title="Value Bets" icon="magnifying-glass-dollar" href="/guides/value-bets">
    Learn how to identify profitable betting opportunities.
  </Card>

  <Card title="WebSocket Feed" icon="bolt" href="/guides/websockets">
    Real-time odds updates via WebSocket.
  </Card>
</CardGroup>

<Note>
  **Need help?** Contact us at [hello@odds-api.io](mailto:hello@odds-api.io) - we're here to help!
</Note>


> ## Documentation Index
> Fetch the complete documentation index at: https://docs.odds-api.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication

> Authenticate Odds-API.io requests using API keys. Includes code examples for cURL, Python, JavaScript and best practices for secure credentials.

## API Key Authentication

Odds-API.io uses API key authentication to secure access to the API. Your API key identifies your account and tracks your usage.

### Getting Your API Key

1. Sign up for free at [odds-api.io](https://odds-api.io)
2. Check your email for the API key
3. Copy and securely store your API key

<Warning>
  **Keep your API key secure!** Never share it publicly, commit it to version control, or expose it in client-side code.
</Warning>

### Using Your API Key

Include your API key as a query parameter in all authenticated requests:

```
https://api.odds-api.io/v3/events?apiKey=YOUR_API_KEY&sport=football
```

<CodeGroup>
  ```bash cURL theme={null}
  curl "https://api.odds-api.io/v3/events?apiKey=YOUR_API_KEY&sport=football"
  ```

  ```javascript JavaScript theme={null}
  const apiKey = process.env.ODDS_API_KEY;

  const response = await fetch(
    `https://api.odds-api.io/v3/events?apiKey=${apiKey}&sport=football`
  );
  const data = await response.json();
  ```

  ```python Python theme={null}
  import os
  import requests

  api_key = os.environ.get('ODDS_API_KEY')

  response = requests.get(
      'https://api.odds-api.io/v3/events',
      params={
          'apiKey': api_key,
          'sport': 'football'
      }
  )
  data = response.json()
  ```

  ```php PHP theme={null}
  <?php
  $apiKey = getenv('ODDS_API_KEY');

  $url = 'https://api.odds-api.io/v3/events?' . http_build_query([
      'apiKey' => $apiKey,
      'sport' => 'football'
  ]);

  $response = file_get_contents($url);
  $data = json_decode($response, true);
  ```
</CodeGroup>

## Security Best Practices

### Use Environment Variables

Store your API key in environment variables instead of hardcoding it:

<CodeGroup>
  ```bash .env theme={null}
  ODDS_API_KEY=your_api_key_here
  ```

  ```javascript .env.local (Next.js) theme={null}
  ODDS_API_KEY=your_api_key_here
  ```

  ```python .env theme={null}
  ODDS_API_KEY=your_api_key_here
  ```
</CodeGroup>

### Server-Side Only

<Warning>
  Never expose your API key in client-side JavaScript code. Always make API calls from your backend server.
</Warning>

**Bad Practice:**

```javascript theme={null}
// ❌ DON'T DO THIS - API key exposed in browser
const apiKey = 'a7f3k9m2p5q8r1t4w6x9z2b5c8';
fetch(`https://api.odds-api.io/v3/events?apiKey=${apiKey}`);
```

**Good Practice:**

```javascript theme={null}
// ✅ Use a backend proxy
// Frontend
const response = await fetch('/api/odds/events');

// Backend (Node.js/Express)
app.get('/api/odds/events', async (req, res) => {
  const apiKey = process.env.ODDS_API_KEY;
  const response = await fetch(
    `https://api.odds-api.io/v3/events?apiKey=${apiKey}&sport=football`
  );
  const data = await response.json();
  res.json(data);
});
```

### Rotate Keys Regularly

For enhanced security:

* Rotate your API keys periodically
* Generate separate keys for development and production
* Immediately revoke compromised keys

## Rate Limiting

API requests are rate-limited based on your subscription plan:

| Plan    | Requests per Hour | Additional Packages Available |
| ------- | ----------------- | ----------------------------- |
| Starter | 5,000             | +10K/20K/30K per hour         |
| Growth  | 5,000             | +10K/20K/30K per hour         |
| Pro     | 5,000             | +10K/20K/30K per hour         |

**Additional Request Packages:**

* +10K requests/hour: £139/month
* +20K requests/hour: £229/month
* +30K requests/hour: £309/month
* Custom volumes available on request

### Monitoring Rate Limits

The API returns rate limit information in response headers with every request:

```
x-ratelimit-limit: 99999999
x-ratelimit-remaining: 99999862
x-ratelimit-reset: 2025-10-03T18:07:41Z
```

* **x-ratelimit-limit**: Total requests allowed in the current window
* **x-ratelimit-remaining**: Requests remaining in the current window
* **x-ratelimit-reset**: ISO 8601 timestamp when the rate limit resets

When you exceed the rate limit, you'll receive a `429 Too Many Requests` response:

```json theme={null}
{
  "error": "Rate limit exceeded. Please try again later."
}
```

### Best Practices for Rate Limiting

1. **Monitor response headers** to track your usage and remaining requests
2. **Implement exponential backoff** when you receive 429 errors
3. **Cache responses** when appropriate to reduce API calls
4. **Use the multi-odds endpoint** to fetch odds for multiple events in a single request

<CodeGroup>
  ```javascript JavaScript - Rate Limit Handling theme={null}
  async function fetchWithRetry(url, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      const response = await fetch(url);

      // Log rate limit info
      console.log('Rate limit:', response.headers.get('x-ratelimit-remaining'),
                  '/', response.headers.get('x-ratelimit-limit'));
      console.log('Resets at:', response.headers.get('x-ratelimit-reset'));

      if (response.status === 429) {
        const resetTime = new Date(response.headers.get('x-ratelimit-reset'));
        const waitTime = Math.max(resetTime - Date.now(), Math.pow(2, i) * 1000);

        console.log(`Rate limited. Waiting ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }

      return response.json();
    }

    throw new Error('Max retries exceeded');
  }
  ```

  ```python Python - Rate Limit Handling theme={null}
  import time
  import requests
  from datetime import datetime

  def fetch_with_retry(url, max_retries=3):
      for i in range(max_retries):
          response = requests.get(url)

          # Log rate limit info
          print(f"Rate limit: {response.headers.get('x-ratelimit-remaining')} / {response.headers.get('x-ratelimit-limit')}")
          print(f"Resets at: {response.headers.get('x-ratelimit-reset')}")

          if response.status_code == 429:
              reset_time = datetime.fromisoformat(response.headers.get('x-ratelimit-reset').replace('Z', '+00:00'))
              wait_time = max((reset_time - datetime.now()).total_seconds(), 2 ** i)

              print(f"Rate limited. Waiting {wait_time}s...")
              time.sleep(wait_time)
              continue

          return response.json()

      raise Exception('Max retries exceeded')
  ```
</CodeGroup>

## Error Responses

The API uses standard HTTP status codes:

| Status Code | Description                               |
| ----------- | ----------------------------------------- |
| 200         | Success                                   |
| 400         | Bad Request - Invalid parameters          |
| 401         | Unauthorized - Invalid or missing API key |
| 403         | Forbidden - API key doesn't have access   |
| 404         | Not Found - Resource doesn't exist        |
| 429         | Too Many Requests - Rate limit exceeded   |
| 500         | Internal Server Error                     |

All errors return a JSON response with an error message:

```json theme={null}
{
  "error": "Invalid API key provided"
}
```

## Next Steps

<CardGroup cols={2}>
  <Card title="Quickstart" icon="rocket" href="/quickstart">
    Make your first API call
  </Card>

  <Card title="Best Practices" icon="lightbulb" href="/guides/best-practices">
    Learn optimization techniques
  </Card>
</CardGroup>


> ## Documentation Index
> Fetch the complete documentation index at: https://docs.odds-api.io/llms.txt
> Use this file to discover all available pages before exploring further.

# AI & Vibe Coding

> Use AI tools like ChatGPT, Claude, Cursor, and VS Code Copilot to build with the Odds-API.io. Access AI-ready documentation, OpenAPI specs, and MCP server integration.

## Overview

We provide AI-ready resources to help you build faster with AI coding assistants. Whether you're using ChatGPT, Claude, Cursor, VS Code Copilot, or other AI tools, we have resources that give these tools the context they need to generate accurate, production-ready code.

## Machine-Readable Documentation

We provide documentation in formats optimized for AI coding tools:

### Documentation Index

A lightweight file listing all documentation pages with URLs and descriptions. AI tools can scan this to find relevant pages to fetch.

**URL:** [`https://docs.odds-api.io/llms.txt`](https://docs.odds-api.io/llms.txt)
**Size:** \~500 tokens

### Complete Documentation

The entire API documentation compiled into a single text file. Best for AI tools with large context windows that can ingest everything at once.

**URL:** [`https://docs.odds-api.io/llms-full.txt`](https://docs.odds-api.io/llms-full.txt)
**Size:** \~2.5k tokens

### OpenAPI Specification

Machine-readable API definition following the OpenAPI 3.0 standard. Contains all endpoints, parameters, request/response schemas, and examples.

**URL:** [`https://docs.odds-api.io/api-reference/openapi.json`](https://docs.odds-api.io/api-reference/openapi.json)
**Size:** \~22k tokens

### MCP Server

For AI tools that support the Model Context Protocol, our MCP server provides direct API access. See [setup instructions](#mcp-server) below.

## Quick Start: Copy-Paste Context

Copy this context block and paste it into your AI tool for instant API knowledge:

```
You are helping me build with the Odds-API.io sports betting odds API.

API Base URL: https://api.odds-api.io/v3
Authentication: API key as query parameter (?apiKey=YOUR_KEY)

Key endpoints:
- GET /sports - List sports (no auth)
- GET /bookmakers - List bookmakers (no auth)
- GET /events?sport={slug}&apiKey={key} - Get events
- GET /odds?eventId={id}&bookmakers={list}&apiKey={key} - Get odds
- GET /odds/multi?eventIds={ids}&bookmakers={list}&apiKey={key} - Batch odds (up to 10 events)
- GET /value-bets?bookmaker={name}&apiKey={key} - Value betting opportunities
- GET /arbitrage-bets?bookmakers={list}&apiKey={key} - Arbitrage opportunities
- GET /dropping-odds?sport={slug}&apiKey={key} - Dropping odds from sharp bookmakers (paid plans only)

For complete documentation, fetch: https://docs.odds-api.io/llms-full.txt
For OpenAPI spec: https://docs.odds-api.io/api-reference/openapi.json
```

## Setup by Tool

<Tabs>
  <Tab title="Claude">
    ### Claude (chat.anthropic.com)

    1. Start a new conversation
    2. Paste the context block above, or
    3. Ask Claude to fetch the full documentation:

    ```
    Please fetch and read https://docs.odds-api.io/llms-full.txt to understand the Odds-API.io API, then help me [your task].
    ```
  </Tab>

  <Tab title="ChatGPT">
    ### ChatGPT

    1. Start a new conversation
    2. Paste the context block above, or
    3. Provide the documentation URL:

    ```
    Read the documentation at https://docs.odds-api.io/llms-full.txt and help me build [your project] using the Odds-API.io API.
    ```
  </Tab>

  <Tab title="Cursor">
    ### Cursor IDE

    **Option 1: Project Rules**

    Create `.cursor/rules.md` in your project:

    ```markdown theme={null}
    # Odds-API.io Integration

    This project uses the Odds-API.io sports betting odds API.

    API Base URL: https://api.odds-api.io/v3
    Auth: API key as query parameter (?apiKey=YOUR_KEY)

    Documentation: https://docs.odds-api.io/llms-full.txt
    OpenAPI Spec: https://docs.odds-api.io/api-reference/openapi.json

    Key endpoints:
    - GET /sports - List sports (no auth)
    - GET /bookmakers - List bookmakers (no auth)
    - GET /events?sport={slug}&apiKey={key} - Get events
    - GET /odds?eventId={id}&bookmakers={list}&apiKey={key} - Get odds
    - GET /value-bets?bookmaker={name}&apiKey={key} - Value bets
    - GET /dropping-odds?sport={slug}&apiKey={key} - Dropping odds (paid plans only)
    ```

    **Option 2: MCP Server**

    See the [MCP Server](#mcp-server) section below for direct API integration.
  </Tab>

  <Tab title="VS Code">
    ### VS Code with GitHub Copilot

    Add context to your workspace by creating a `.github/copilot-instructions.md` file:

    ```markdown theme={null}
    # Odds-API.io Context

    This project integrates with Odds-API.io for sports betting odds data.

    Base URL: https://api.odds-api.io/v3
    Authentication: API key as query parameter

    Key endpoints:
    - GET /sports - List available sports
    - GET /events?sport={slug}&apiKey={key} - Get events
    - GET /odds?eventId={id}&bookmakers={list}&apiKey={key} - Get odds
    - GET /dropping-odds?sport={slug}&apiKey={key} - Dropping odds (paid plans only)

    Full docs: https://docs.odds-api.io/llms-full.txt
    ```
  </Tab>

  <Tab title="Claude Code">
    ### Claude Code CLI

    1. Create a `CLAUDE.md` file in your project root:

    ```markdown theme={null}
    # Odds-API.io Project

    This project uses the Odds-API.io sports betting odds API.

    ## API Reference

    Base URL: https://api.odds-api.io/v3
    Auth: API key as query parameter (?apiKey=YOUR_KEY)

    Full documentation: https://docs.odds-api.io/llms-full.txt
    OpenAPI spec: https://docs.odds-api.io/api-reference/openapi.json

    ## Key Endpoints

    - GET /sports - List sports (no auth required)
    - GET /bookmakers - List bookmakers (no auth required)
    - GET /events?sport={slug}&apiKey={key} - Get events for a sport
    - GET /odds?eventId={id}&bookmakers={list}&apiKey={key} - Get odds
    - GET /value-bets?bookmaker={name}&apiKey={key} - Get value bets
    - GET /arbitrage-bets?bookmakers={list}&apiKey={key} - Get arbitrage opportunities
    - GET /dropping-odds?sport={slug}&apiKey={key} - Get dropping odds (paid plans only)

    ## Environment Variables

    ODDS_API_KEY - Your API key from odds-api.io
    ```

    2. Run `claude` in your project directory
  </Tab>
</Tabs>

## MCP Server

The Model Context Protocol (MCP) server provides direct API integration for AI tools, allowing them to fetch live data from your Odds-API.io account.

### Features

* **12 API tools** - Get sports, bookmakers, events, odds, value bets, and arbitrage opportunities
* **Documentation resources** - Access full docs and OpenAPI spec directly
* **Real-time data** - Fetch live odds and events

### Setup

<Tabs>
  <Tab title="Claude Code">
    ```bash theme={null}
    claude mcp add odds-api --env ODDS_API_KEY="your-api-key" -- npx -y odds-api-mcp-server
    ```
  </Tab>

  <Tab title="Claude Desktop">
    Add to `~/.config/claude/claude_desktop_config.json`:

    ```json theme={null}
    {
      "mcpServers": {
        "odds-api": {
          "command": "npx",
          "args": ["-y", "odds-api-mcp-server"],
          "env": {
            "ODDS_API_KEY": "your-api-key"
          }
        }
      }
    }
    ```
  </Tab>

  <Tab title="Cursor">
    Add to your Cursor MCP settings:

    ```json theme={null}
    {
      "odds-api": {
        "command": "npx",
        "args": ["-y", "odds-api-mcp-server"],
        "env": {
          "ODDS_API_KEY": "your-api-key"
        }
      }
    }
    ```
  </Tab>
</Tabs>

### Available Tools

| Tool                 | Description                       |
| -------------------- | --------------------------------- |
| `get_sports`         | List all available sports         |
| `get_bookmakers`     | List all available bookmakers     |
| `get_leagues`        | Get leagues for a sport           |
| `get_events`         | Get events with filtering options |
| `get_live_events`    | Get currently live events         |
| `search_events`      | Search events by text             |
| `get_odds`           | Get odds for an event             |
| `get_multi_odds`     | Get odds for multiple events      |
| `get_value_bets`     | Get value betting opportunities   |
| `get_arbitrage_bets` | Get arbitrage opportunities       |
| `get_participants`   | Get teams/participants            |
| `get_documentation`  | Get API documentation             |

## Example Prompts

Here are some example prompts to get you started:

### Building an Odds Comparison App

```
Using the Odds-API.io API, help me build a React component that:
1. Fetches upcoming Premier League matches
2. Gets odds from Bet365, SingBet, and Unibet
3. Displays a comparison table showing the best odds for each outcome
```

### Creating a Value Bet Finder

```
Help me build a Python script that:
1. Fetches value bets from the Odds-API.io /value-bets endpoint
2. Filters for bets with > 5% expected value
3. Sends alerts to a Discord webhook when new value bets are found
```

### Real-Time Odds Tracker

```
Create a Node.js service that:
1. Connects to the Odds-API.io WebSocket
2. Tracks odds movements for specific events
3. Stores historical data in a database
4. Exposes an API endpoint for querying odds history
```

## Resources

<CardGroup cols={2}>
  <Card title="API Reference" icon="book" href="/api-reference/introduction">
    Complete API documentation with all endpoints and parameters.
  </Card>

  <Card title="Quickstart Guide" icon="rocket" href="/quickstart">
    Get up and running with your first API call.
  </Card>

  <Card title="Best Practices" icon="lightbulb" href="/guides/best-practices">
    Optimize your API usage for performance and cost.
  </Card>

  <Card title="Code Examples" icon="code" href="/examples/comparing-odds">
    Ready-to-use code examples for common use cases.
  </Card>
</CardGroup>


> ## Documentation Index
> Fetch the complete documentation index at: https://docs.odds-api.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Fetching Odds

> Fetch and compare betting odds from 250+ bookmakers. Covers single events, batch requests, filtering by sport/league, and real-time updates.

## Overview

The Odds-API.io provides several endpoints for fetching odds data from multiple bookmakers. This guide covers best practices and common patterns for working with odds data.

<Note>
  For an up-to-date list of all supported bookmakers, visit [odds-api.io/sportsbooks](https://odds-api.io/sportsbooks).
</Note>

## Basic Workflow

1. **Get available sports** - Fetch the list of supported sports
2. **Get leagues** - Retrieve leagues for your chosen sport
3. **Get events** - Find upcoming or live events
4. **Get odds** - Fetch odds from selected bookmakers

## Fetching Odds for a Single Event

Use the `/v3/odds` endpoint to get odds for a specific event:

<CodeGroup>
  ```javascript JavaScript theme={null}
  const apiKey = process.env.ODDS_API_KEY;
  const eventId = 123456;
  const bookmakers = ['Bet365', 'Unibet', 'SingBet'].join(',');

  const response = await fetch(
    `https://api.odds-api.io/v3/odds?apiKey=${apiKey}&eventId=${eventId}&bookmakers=${bookmakers}`
  );

  const data = await response.json();
  console.log(data);
  ```

  ```python Python theme={null}
  import requests
  import os

  api_key = os.environ['ODDS_API_KEY']
  event_id = 123456
  bookmakers = 'Bet365,Unibet,SingBet'

  response = requests.get(
      'https://api.odds-api.io/v3/odds',
      params={
          'apiKey': api_key,
          'eventId': event_id,
          'bookmakers': bookmakers
      }
  )

  data = response.json()
  print(data)
  ```

  ```php PHP theme={null}
  <?php
  $apiKey = getenv('ODDS_API_KEY');
  $eventId = 123456;
  $bookmakers = 'Bet365,Unibet,SingBet';

  $url = 'https://api.odds-api.io/v3/odds?' . http_build_query([
      'apiKey' => $apiKey,
      'eventId' => $eventId,
      'bookmakers' => $bookmakers
  ]);

  $response = file_get_contents($url);
  $data = json_decode($response, true);
  print_r($data);
  ```
</CodeGroup>

## Fetching Odds for Multiple Events

For better efficiency, use the `/v3/odds/multi` endpoint to fetch odds for up to 10 events in a single request:

<CodeGroup>
  ```javascript JavaScript theme={null}
  const apiKey = process.env.ODDS_API_KEY;
  const eventIds = [123456, 123457, 123458].join(',');
  const bookmakers = ['Bet365', 'Unibet'].join(',');

  const response = await fetch(
    `https://api.odds-api.io/v3/odds/multi?apiKey=${apiKey}&eventIds=${eventIds}&bookmakers=${bookmakers}`
  );

  const data = await response.json();
  // Returns an array of event odds
  console.log(data);
  ```

  ```python Python theme={null}
  import requests
  import os

  api_key = os.environ['ODDS_API_KEY']
  event_ids = '123456,123457,123458'
  bookmakers = 'Bet365,Unibet'

  response = requests.get(
      'https://api.odds-api.io/v3/odds/multi',
      params={
          'apiKey': api_key,
          'eventIds': event_ids,
          'bookmakers': bookmakers
      }
  )

  data = response.json()
  # Returns an array of event odds
  print(data)
  ```
</CodeGroup>

<Tip>
  The multi-odds endpoint counts as only **1 API request** regardless of how many events you fetch (up to 10).
</Tip>

## Understanding the Odds Response

The odds response includes multiple markets for each bookmaker:

```json theme={null}
{
  "id": 123456,
  "home": "Manchester United",
  "away": "Liverpool",
  "date": "2025-10-15T15:00:00Z",
  "status": "pending",
  "bookmakers": {
    "Bet365": [
      {
        "name": "ML",
        "odds": [
          {
            "home": "2.10",
            "draw": "3.40",
            "away": "3.20"
          }
        ],
        "updatedAt": "2025-10-04T10:30:00Z"
      },
      {
        "name": "Asian Handicap",
        "odds": [
          {
            "hdp": -0.5,
            "home": "1.95",
            "away": "1.85"
          }
        ]
      },
      {
        "name": "Over/Under",
        "odds": [
          {
            "max": 2.5,
            "over": "1.90",
            "under": "1.90"
          }
        ]
      }
    ]
  }
}
```

### Market Types

* **ML** - Match result (Home, Draw, Away)
* **Spread** - Handicap betting with fractional lines
* **Totals** - Total goals/points over or under a line
* **Both Teams to Score** - Yes/No markets
* **Correct Score** - Exact score predictions
* **And many more...**

## Finding the Best Odds

Here's an example of comparing odds across bookmakers to find the best value:

```javascript theme={null}
function findBestOdds(oddsData) {
  const market = 'ML';
  const bestOdds = {
    home: { bookmaker: null, odds: 0, link: null },
    draw: { bookmaker: null, odds: 0, link: null },
    away: { bookmaker: null, odds: 0, link: null }
  };

  for (const [bookmaker, markets] of Object.entries(oddsData.bookmakers)) {
    const marketML = markets.find(m => m.name === market);
    if (!marketML?.odds[0]) continue;

    const odds = marketML.odds[0];

    if (parseFloat(odds.home) > bestOdds.home.odds) {
      bestOdds.home = {
        bookmaker,
        odds: parseFloat(odds.home)
      };
    }

    if (odds.draw && parseFloat(odds.draw) > bestOdds.draw.odds) {
      bestOdds.draw = {
        bookmaker,
        odds: parseFloat(odds.draw)
      };
    }

    if (parseFloat(odds.away) > bestOdds.away.odds) {
      bestOdds.away = {
        bookmaker,
        odds: parseFloat(odds.away)
      };
    }
  }

  return bestOdds;
}

// Usage
const bestOdds = findBestOdds(oddsData);
console.log('Best home odds:', bestOdds.home.odds, 'at', bestOdds.home.bookmaker);
```

## Getting Updated Odds

For real-time applications, use the `/v3/odds/updated` endpoint to fetch only odds that have changed:

```javascript theme={null}
const apiKey = process.env.ODDS_API_KEY;
const since = Math.floor(Date.now() / 1000) - 60; // Last 60 seconds
const bookmaker = 'Bet365';
const sport = 'Football';

const response = await fetch(
  `https://api.odds-api.io/v3/odds/updated?apiKey=${apiKey}&since=${since}&bookmaker=${bookmaker}&sport=${sport}`
);

const updatedOdds = await response.json();
```

<Note>
  The `since` parameter must be a UNIX timestamp no older than 1 minute.
</Note>

## Caching Strategies

To optimize performance and reduce API calls:

1. **Cache event lists** for 5-10 minutes
2. **Cache pre-match odds** for 30-60 seconds
3. **Cache live odds** for 5-10 seconds
4. **Use updated odds endpoint** for incremental updates

```javascript theme={null}
// Example caching with Node.js
const cache = new Map();
const CACHE_TTL = 60000; // 60 seconds

async function getCachedOdds(eventId) {
  const cacheKey = `odds:${eventId}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const data = await fetchOdds(eventId);
  cache.set(cacheKey, { data, timestamp: Date.now() });

  return data;
}
```

## Best Practices

<AccordionGroup>
  <Accordion title="Select Only Needed Bookmakers">
    Select only the most relevant bookmakers for your users. See the [full list of supported bookmakers](https://odds-api.io/sportsbooks).
  </Accordion>

  <Accordion title="Use Multi-Odds Endpoint">
    Batch requests using `/v3/odds/multi` to reduce API calls and stay within rate limits.
  </Accordion>

  <Accordion title="Implement Proper Caching">
    Cache odds data appropriately based on match status (pre-match vs live).
  </Accordion>

  <Accordion title="Handle Missing Data Gracefully">
    Not all bookmakers offer all markets. Always check if data exists before accessing it.
  </Accordion>
</AccordionGroup>

## Next Steps

<CardGroup cols={2}>
  <Card title="Value Bets" icon="magnifying-glass-dollar" href="/guides/value-bets">
    Learn how to identify profitable betting opportunities
  </Card>

  <Card title="WebSockets" icon="bolt" href="/guides/websockets">
    Get real-time odds updates via WebSocket connections
  </Card>
</CardGroup>


> ## Documentation Index
> Fetch the complete documentation index at: https://docs.odds-api.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Live Events, Match Clock & Logos

> Fetch in-play events with live scores and a real-time match clock, and serve team logos straight from the API.

## Live Events

`GET /events/live` returns all currently in-play events, optionally filtered by sport:

```bash theme={null}
curl "https://api.odds-api.io/v3/events/live?sport=football&apiKey=YOUR_KEY"
```

Each event includes live scores and, where available, a `clock` object with the current match clock. The same `clock` field also appears on live events returned by `GET /events?status=live` and `GET /events/{id}`.

## The Clock Object

Live events carry an optional `clock` field:

```json theme={null}
{
  "id": 65068198,
  "home": "Manchester City",
  "away": "Liverpool FC",
  "status": "live",
  "scores": { "home": 1, "away": 0 },
  "clock": {
    "minute": 67,
    "playedSeconds": 4023,
    "period": 2,
    "running": true,
    "statusDetail": "2nd half",
    "injuryTime": 4
  }
}
```

| Field           | Type    | Description                                                                                                |
| --------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `minute`        | integer | Cumulative match minute (elapsed play, not time remaining)                                                 |
| `playedSeconds` | integer | Seconds of play elapsed                                                                                    |
| `period`        | integer | Current period number (half, quarter, set)                                                                 |
| `running`       | boolean | Whether the clock is currently ticking                                                                     |
| `statusDetail`  | string  | Human-readable phase, e.g. `"2nd half"`, `"Break"`                                                         |
| `serve`         | string  | `"home"` or `"away"`: the current server, or in turn-based sports (snooker, darts) the player at the table |
| `injuryTime`    | integer | Announced stoppage time in minutes (football)                                                              |

A few things to know:

* `clock` is **omitted entirely** when no clock data is available for an event. Treat it as optional.
* `minute` and `playedSeconds` are extrapolated server-side from the live feed, so they stay accurate even when the response is served from cache.
* The clock only advances while `running` is `true`. During half-time and other breaks it freezes at the last played second.
* For a per-second ticker in your UI, extrapolate client-side from `playedSeconds` at the moment you received the response, while `running` is `true`.

```javascript theme={null}
// Per-second client-side ticker
const receivedAt = Date.now();
function currentSeconds(clock) {
  if (!clock.running) return clock.playedSeconds;
  return clock.playedSeconds + Math.floor((Date.now() - receivedAt) / 1000);
}
```

### `statusDetail` values

`statusDetail` is the live feed's phase description passed through as-is. The exact
strings vary by sport; treat it as display text rather than an enum, and use
`period` + `running` for any betting logic. Values you can expect:

| Sport                         | Typical values                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------- |
| Football                      | `"1st half"`, `"Halftime"`, `"2nd half"`, `"Awaiting extra time"`, `"Penalties"` |
| Basketball                    | `"1st quarter"` ... `"4th quarter"`, `"Break"`                                   |
| Tennis, volleyball, badminton | `"1st set"`, `"2nd set"`, `"3rd set"`, ...                                       |
| Esports                       | `"Map 1"`, `"Map 2"`, `"Map 3"`, ...                                             |
| Baseball                      | `"1st inning"` ... `"9th inning"` (no clock seconds; baseball is untimed)        |
| Cricket                       | `"First innings, home team"`, ...                                                |
| Snooker, darts                | `"Started"`                                                                      |

### Rendering a football clock the conventional way

`minute` is cumulative elapsed play, so first-half stoppage time reads `46`, `47`,
`48`... To render the conventional `45+X` / `90+X` style, cap the minute at the
period boundary:

```javascript theme={null}
function displayMinute(clock) {
  const cap = clock.period === 1 ? 45 : 90;
  if (clock.period <= 2 && clock.minute > cap) {
    return `${cap}+${clock.minute - cap}`; // e.g. "45+3"
  }
  return `${clock.minute}`;
}
```

`injuryTime` carries the announced stoppage minutes when the fourth official
raises the board, so `45+2` with `injuryTime: 4` tells you about two more
minutes of the half remain.

## Participant Logos

`GET /participants/{id}/logo` returns the team or player crest as a PNG, served directly from the Odds-API domain:

```bash theme={null}
curl "https://api.odds-api.io/v3/participants/38/logo?apiKey=YOUR_KEY" -o crest.png
```

Use the `homeId` / `awayId` fields from event responses as the participant id, or look ids up via `GET /participants`.

* Responses include `Cache-Control: public, max-age=86400`, so browsers and CDNs cache them for a day. You can hotlink the URL in an `<img>` tag.
* Returns `404` when no logo exists for the participant. Misses are cached server-side, so repeated lookups for logo-less participants stay fast.
* Logos are served from our infrastructure; no third-party provider URLs are exposed to your users.

## Next Steps

* Stream live scores and match status over WebSocket instead of polling, see the [WebSocket guide](/guides/websockets)
* Fetch odds for live events with [Fetching Odds](/guides/fetching-odds)


> ## Documentation Index
> Fetch the complete documentation index at: https://docs.odds-api.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Prediction Markets

> Access sports betting odds from prediction markets like Polymarket and Kalshi through our unified API. Get order book depth, lay odds, and real-time prices.

## Overview

Prediction markets like **Polymarket** and **Kalshi** allow users to trade on the outcome of events using an order book model. Unlike traditional bookmakers with fixed odds, these platforms have buyers and sellers creating a dynamic market.

Our API normalizes this data into the same format as traditional bookmakers, making it easy to compare odds across all sources.

<Note>
  Our API covers sports events on Polymarket and Kalshi, normalizing their order books into the same format as traditional bookmakers.
</Note>

## How Prediction Markets Work

On platforms like Polymarket and Kalshi, prices are shown in **cents** (0-100), representing the implied probability. For example:

* **60 cents** = 60% implied probability
* **21 cents** = 21% implied probability

We convert these prices to **decimal odds** for consistency with traditional bookmakers.

### Price to Odds Conversion

Prediction markets have a spread between buy (back) and sell (lay) prices. The table below shows **back prices** - what you pay to bet on an outcome:

| Platform Price | Implied Probability | Decimal Odds |
| -------------- | ------------------- | ------------ |
| 60¢            | 60%                 | 1.67         |
| 21¢            | 21%                 | 4.76         |
| 23¢            | 23%                 | 4.35         |

**Formula:** `Decimal Odds = 1 / (Price in cents / 100)`

## Visual Comparison

Here's how the same match appears on Kalshi and Polymarket, and how our API returns the data.

### Kalshi

<Frame>
  <img src="https://mintcdn.com/odds-apiio/SrRZV6uCznnn5e55/images/kalshi-example.png?fit=max&auto=format&n=SrRZV6uCznnn5e55&q=85&s=376f85125f2de2c2f2e384514a00d8be" alt="Kalshi showing Leeds United vs Arsenal match" width="1606" height="1324" data-path="images/kalshi-example.png" />
</Frame>

Kalshi displays prices in cents with Yes/No buttons. Arsenal at 63¢ means you pay 63 cents to win 1 dollar if they win.

### Polymarket

<Frame>
  <img src="https://mintcdn.com/odds-apiio/SrRZV6uCznnn5e55/images/polymarket-example.png?fit=max&auto=format&n=SrRZV6uCznnn5e55&q=85&s=31f3bfc746c79ccd613c0c8d8a065b29" alt="Polymarket showing Leeds vs Arsenal with order book" width="1484" height="1476" data-path="images/polymarket-example.png" />
</Frame>

Polymarket shows the same match with decimal odds (LEE 6.67, DRAW 4.35, ARS 1.56) and a full order book with bids and asks at multiple price levels.

<Note>
  Our API returns **top-of-book prices** (best bid and ask) rather than the full order book depth. This gives you the actionable prices without the complexity of managing multiple price levels.
</Note>

## API Response

Fetch prediction market odds using the standard `/v3/odds` endpoint:

```bash theme={null}
curl "https://api.odds-api.io/v3/odds?eventId=61300983&bookmakers=Polymarket,Kalshi&apiKey=YOUR_API_KEY"
```

### Example Response

```json theme={null}
{
  "id": 61300983,
  "home": "Leeds United",
  "away": "Arsenal FC",
  "date": "2026-01-31T15:00:00Z",
  "status": "pending",
  "sport": {
    "name": "Football",
    "slug": "football"
  },
  "league": {
    "name": "England - Premier League",
    "slug": "england-premier-league"
  },
  "urls": {
    "Kalshi": "https://kalshi.com/events/KXEPLGAME-26JAN31LEEARS",
    "Polymarket": "https://polymarket.com/event/epl-lee-ars-2026-01-31"
  },
  "bookmakerIds": {
    "Kalshi": "KXEPLGAME-26JAN31LEEARS",
    "Polymarket": "170912"
  },
  "bookmakers": {
    "Kalshi": [
      {
        "name": "ML",
        "updatedAt": "2026-01-28T10:06:39.424Z",
        "odds": [
          {
            "home": "6.25",
            "draw": "4.35",
            "away": "1.56",
            "layHome": "1.61",
            "layAway": "7.14",
            "layDraw": "4.76",
            "depthHome": "9215",
            "depthAway": "2164",
            "depthDraw": "7670",
            "depthLayHome": "5371",
            "depthLayAway": "250",
            "depthLayDraw": "1197"
          }
        ]
      }
    ],
    "Polymarket": [
      {
        "name": "ML",
        "updatedAt": "2026-01-28T09:55:32.185Z",
        "odds": [
          {
            "home": "6.67",
            "draw": "4.35",
            "away": "1.56",
            "layHome": "1.61",
            "layAway": "7.14",
            "layDraw": "4.55",
            "depthHome": "12128",
            "depthAway": "331",
            "depthDraw": "26086",
            "depthLayHome": "9401",
            "depthLayAway": "2112",
            "depthLayDraw": "1630"
          }
        ]
      }
    ]
  }
}
```

## Field Reference

### Standard Fields

These fields work the same as traditional bookmakers:

| Field       | Description                        |
| ----------- | ---------------------------------- |
| `home`      | Decimal odds for home team to win  |
| `draw`      | Decimal odds for a draw            |
| `away`      | Decimal odds for away team to win  |
| `updatedAt` | ISO timestamp of last price update |

### Prediction Market Fields

These additional fields are unique to prediction markets:

| Field          | Description                                   |
| -------------- | --------------------------------------------- |
| `layHome`      | Odds to bet **against** the home team winning |
| `layDraw`      | Odds to bet **against** a draw                |
| `layAway`      | Odds to bet **against** the away team winning |
| `depthHome`    | Available liquidity (USD) to back home team   |
| `depthDraw`    | Available liquidity (USD) to back a draw      |
| `depthAway`    | Available liquidity (USD) to back away team   |
| `depthLayHome` | Available liquidity (USD) to lay home team    |
| `depthLayDraw` | Available liquidity (USD) to lay a draw       |
| `depthLayAway` | Available liquidity (USD) to lay away team    |

### URLs and IDs

| Field                     | Description                            |
| ------------------------- | -------------------------------------- |
| `urls.Kalshi`             | Direct link to the event on Kalshi     |
| `urls.Polymarket`         | Direct link to the event on Polymarket |
| `bookmakerIds.Kalshi`     | Kalshi's internal event identifier     |
| `bookmakerIds.Polymarket` | Polymarket's internal event identifier |

<Tip>
  Use `bookmakerIds` to execute trades directly via Kalshi or Polymarket APIs. Fetch odds from our API, then place orders on their platforms using their native event IDs.
</Tip>

## Understanding Back vs Lay Odds

Prediction markets operate like betting exchanges where you can either:

* **Back** (buy yes): Bet on an outcome to happen
* **Lay** (buy no): Bet against an outcome happening

<AccordionGroup>
  <Accordion title="Back Odds (home, draw, away)">
    The `home`, `draw`, and `away` fields represent the best available price to **back** (bet for) each outcome. This is equivalent to standard bookmaker odds.

    Example: `"away": "1.56"` means you can back Arsenal to win at odds of 1.56 (stake $100 to win $56 profit).
  </Accordion>

  <Accordion title="Lay Odds (layHome, layDraw, layAway)">
    The `layHome`, `layDraw`, and `layAway` fields represent the best available price to **lay** (bet against) each outcome. When you lay, you're acting as the bookmaker.

    Example: `"layAway": "7.14"` means you can bet against Arsenal winning. To win $100 if Arsenal doesn't win, you risk $614 in liability if they do win. The lay odds represent your potential liability, not your payout.
  </Accordion>

  <Accordion title="Depth (Liquidity)">
    The `depth` fields show how much money (in USD) is available at the current best price.

    **Why this matters:** A price with \$50 depth looks good on paper, but you can't get meaningful size on it. Always check depth before assuming a price is actionable.

    Example: `"depthAway": "2164"` means there's \$2,164 available to back Arsenal at the current price. Bets larger than this will get worse prices as they eat into the order book.
  </Accordion>
</AccordionGroup>

## Available Markets

### Kalshi Markets

Kalshi offers several market types for sports events:

| Market                | Description                   |
| --------------------- | ----------------------------- |
| `ML`                  | Match result (Home/Draw/Away) |
| `Spread`              | Handicap betting              |
| `Totals`              | Over/under total goals        |
| `Both Teams To Score` | Yes/No on both teams scoring  |

### Polymarket Markets

| Market                | Description                   |
| --------------------- | ----------------------------- |
| `ML`                  | Match result (Home/Draw/Away) |
| `Totals`              | Over/under total goals        |
| `Both Teams To Score` | Yes/No on both teams scoring  |

## Comparing with Traditional Bookmakers

You can mix prediction markets with traditional bookmakers in the same request:

```bash theme={null}
curl "https://api.odds-api.io/v3/odds?eventId=61300983&bookmakers=Polymarket,Kalshi,Bet365,Unibet&apiKey=YOUR_API_KEY"
```

This allows you to:

* Find the best odds across all platforms
* Identify arbitrage opportunities
* Compare exchange prices with fixed-odds bookmakers

<Tip>
  Prediction markets often have better odds for popular events due to lower margins, but may have less liquidity for obscure matches.
</Tip>

## Use Cases

<CardGroup cols={2}>
  <Card title="Arbitrage Detection" icon="scale-balanced">
    Compare back/lay odds across prediction markets to find guaranteed profit opportunities.
  </Card>

  <Card title="Best Odds Search" icon="trophy">
    Include prediction markets in your odds comparison to find the highest available prices.
  </Card>

  <Card title="Liquidity Analysis" icon="water">
    Use depth fields to understand how much you can bet before moving the market.
  </Card>

  <Card title="Market Sentiment" icon="chart-line">
    Track how prediction market prices move compared to traditional bookmakers.
  </Card>
</CardGroup>

## Next Steps

<CardGroup cols={2}>
  <Card title="Fetching Odds" icon="download" href="/guides/fetching-odds">
    Learn more about fetching odds from any bookmaker
  </Card>

  <Card title="Value Bets" icon="magnifying-glass-dollar" href="/guides/value-bets">
    Use prediction market odds to identify value bets
  </Card>
</CardGroup>


> ## Documentation Index
> Fetch the complete documentation index at: https://docs.odds-api.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Value Bets

> Learn how Odds-API.io calculates value bets by comparing bookmaker odds against market averages. Find positive expected value betting opportunities.

## What are Value Bets?

A value bet occurs when the probability of an outcome is greater than what the bookmaker's odds imply. The Odds-API.io automatically calculates expected value (EV) by comparing individual bookmaker odds against the market average.

## How Value Bets Work

Fair odds are calculated from a panel of sharp bookmakers that consistently offer the tightest margins and accept high stakes. These books are stress-tested by professional bettors daily, so their prices reflect genuine market probability better than softer books with padded margins. We use this sharp consensus as the baseline rather than averaging all bookmakers, which would be skewed by recreational pricing.

The API then compares each target bookmaker's odds against this sharp baseline:

1. Calculates fair odds from the sharp bookmaker consensus
2. Compares the target bookmaker's odds to the fair odds
3. Identifies opportunities where the bookmaker offers higher odds than the sharp consensus implies

**Formula:**

```
Expected Value (EV) = (Fair Probability × Bookmaker Odds) - 1
```

A positive EV indicates the bookmaker is offering odds above what the sharp market considers fair.

## Query Parameters

| Parameter             | Required | Description                                                                                                                        |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`              | Yes      | Your API key                                                                                                                       |
| `bookmaker`           | Yes      | Bookmaker name (e.g. `Bet365`)                                                                                                     |
| `sport`               | No       | Filter by sport slug (e.g. `baseball`). Server-side filter — reduces response size and removes the need for client-side filtering. |
| `league`              | No       | Filter by league slug (e.g. `usa-mlb`). Requires `sport` to also be set.                                                           |
| `includeEventDetails` | No       | Include match info (home, away, league, sport, date) in the response                                                               |

## Fetching Value Bets

Use the `/v3/value-bets` endpoint to get current value betting opportunities:

<CodeGroup>
  ```javascript JavaScript theme={null}
  const apiKey = process.env.ODDS_API_KEY;
  const bookmaker = 'Bet365';
  const includeEventDetails = true;

  const response = await fetch(
    `https://api.odds-api.io/v3/value-bets?apiKey=${apiKey}&bookmaker=${bookmaker}&includeEventDetails=${includeEventDetails}`
  );

  const valueBets = await response.json();
  console.log(valueBets);
  ```

  ```python Python theme={null}
  import requests
  import os

  api_key = os.environ['ODDS_API_KEY']
  bookmaker = 'Bet365'
  include_event_details = True

  response = requests.get(
      'https://api.odds-api.io/v3/value-bets',
      params={
          'apiKey': api_key,
          'bookmaker': bookmaker,
          'includeEventDetails': include_event_details
      }
  )

  value_bets = response.json()
  print(value_bets)
  ```

  ```php PHP theme={null}
  <?php
  $apiKey = getenv('ODDS_API_KEY');
  $bookmaker = 'Bet365';
  $includeEventDetails = true;

  $url = 'https://api.odds-api.io/v3/value-bets?' . http_build_query([
      'apiKey' => $apiKey,
      'bookmaker' => $bookmaker,
      'includeEventDetails' => $includeEventDetails
  ]);

  $response = file_get_contents($url);
  $valueBets = json_decode($response, true);
  print_r($valueBets);
  ```
</CodeGroup>

## Filtering by Sport or League

Filter results server-side so only value bets from the sports or leagues you care about come back. This reduces response size and removes the need for client-side filtering.

<CodeGroup>
  ```bash Baseball only theme={null}
  curl "https://api.odds-api.io/v3/value-bets?apiKey=YOUR_KEY&bookmaker=Bet365&sport=baseball"
  ```

  ```bash MLB only theme={null}
  curl "https://api.odds-api.io/v3/value-bets?apiKey=YOUR_KEY&bookmaker=Bet365&sport=baseball&league=usa-mlb"
  ```
</CodeGroup>

Validation rules:

* Providing `league` without `sport` returns `400`.
* Unknown `sport` slug returns `400`.
* Unknown `league` for a valid sport returns `404`.

## Response Format

```json theme={null}
[
  {
    "id": "vb_123456_bet365_home",
    "eventId": 123456,
    "bookmaker": "Bet365",
    "market": {
      "name": "ML",
      "home": "2.10",
      "draw": "3.40",
      "away": "3.20",
      "hdp": null,
      "max": null
    },
    "betSide": "home",
    "expectedValue": 0.0523,
    "expectedValueUpdatedAt": "2025-10-04T10:30:00Z",
    "bookmakerOdds": {
      "home": "2.10",
      "draw": "3.40",
      "away": "3.20",
      "href": "https://bet365.com/..."
    },
    "event": {
      "home": "Manchester United",
      "away": "Liverpool",
      "date": "2025-10-15T15:00:00Z",
      "sport": "Football",
      "league": "England - Premier League"
    }
  }
]
```

## Understanding the Response

| Field           | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `expectedValue` | The calculated EV (positive means value)                      |
| `betSide`       | Which outcome has value (home, draw, away, over, under, etc.) |
| `market`        | Market odds used for comparison                               |
| `bookmakerOdds` | Current odds at the bookmaker                                 |
| `event`         | Match details (when `includeEventDetails=true`)               |

## Filtering Value Bets

Filter value bets to find the most profitable opportunities:

```javascript theme={null}
function filterValueBets(valueBets, minEV = 0.03) {
  return valueBets
    .filter(bet => bet.expectedValue >= minEV)
    .sort((a, b) => b.expectedValue - a.expectedValue);
}

// Get value bets with at least 3% expected value
const topValueBets = filterValueBets(valueBets, 0.03);

topValueBets.forEach(bet => {
  const evPercent = (bet.expectedValue * 100).toFixed(2);
  console.log(`${bet.event.home} vs ${bet.event.away}`);
  console.log(`Bet on: ${bet.betSide}`);
  console.log(`EV: ${evPercent}%`);
  console.log(`Odds: ${bet.bookmakerOdds[bet.betSide]}`);
  console.log('---');
});
```

## Real-Time Value Bet Monitoring

Value bets are updated every **5 seconds**. Here's how to build a monitoring system:

```javascript theme={null}
async function monitorValueBets(bookmaker, minEV = 0.03) {
  const apiKey = process.env.ODDS_API_KEY;

  async function fetchAndProcess() {
    try {
      const response = await fetch(
        `https://api.odds-api.io/v3/value-bets?apiKey=${apiKey}&bookmaker=${bookmaker}&includeEventDetails=true`
      );
      const valueBets = await response.json();

      const filtered = valueBets.filter(bet => bet.expectedValue >= minEV);

      filtered.forEach(bet => {
        notifyUser(bet); // Send notification to users
        logBet(bet); // Log for analytics
      });
    } catch (error) {
      console.error('Error fetching value bets:', error);
    }
  }

  // Initial fetch
  await fetchAndProcess();

  // Poll every 5 seconds
  setInterval(fetchAndProcess, 5000);
}

// Start monitoring
monitorValueBets('Bet365', 0.03);
```

## Multi-Bookmaker Strategy

Monitor value bets across multiple bookmakers:

```javascript theme={null}
const bookmakers = ['Bet365', 'Unibet', 'SingBet', 'William Hill'];

async function getAllValueBets(minEV = 0.03) {
  const apiKey = process.env.ODDS_API_KEY;

  const promises = bookmakers.map(bookmaker =>
    fetch(
      `https://api.odds-api.io/v3/value-bets?apiKey=${apiKey}&bookmaker=${bookmaker}&includeEventDetails=true`
    ).then(res => res.json())
  );

  const results = await Promise.all(promises);

  // Flatten and filter
  const allValueBets = results
    .flat()
    .filter(bet => bet.expectedValue >= minEV)
    .sort((a, b) => b.expectedValue - a.expectedValue);

  return allValueBets;
}

const topBets = await getAllValueBets(0.03);
```

## Building a Value Bet Alert System

```javascript theme={null}
class ValueBetAlerter {
  constructor(apiKey, minEV = 0.03) {
    this.apiKey = apiKey;
    this.minEV = minEV;
    this.seenBets = new Set();
  }

  async checkForNewValueBets(bookmaker) {
    const response = await fetch(
      `https://api.odds-api.io/v3/value-bets?apiKey=${this.apiKey}&bookmaker=${bookmaker}&includeEventDetails=true`
    );
    const valueBets = await response.json();

    const newBets = valueBets.filter(bet => {
      if (bet.expectedValue < this.minEV) return false;
      if (this.seenBets.has(bet.id)) return false;

      this.seenBets.add(bet.id);
      return true;
    });

    return newBets;
  }

  async sendAlert(bet) {
    const message = `
      🎯 Value Bet Alert!

      ${bet.event.home} vs ${bet.event.away}
      League: ${bet.event.league}
      Sport: ${bet.event.sport}

      Market: ${bet.market.name}
      Bet on: ${bet.betSide}
      Odds: ${bet.bookmakerOdds[bet.betSide]}
      Expected Value: ${(bet.expectedValue * 100).toFixed(2)}%

      Bookmaker: ${bet.bookmaker}
      Place bet: ${bet.bookmakerOdds.href}
    `;

    // Send to your notification system
    // (Email, SMS, Discord, Telegram, etc.)
    console.log(message);
  }

  async monitor(bookmakers) {
    for (const bookmaker of bookmakers) {
      const newBets = await this.checkForNewValueBets(bookmaker);
      newBets.forEach(bet => this.sendAlert(bet));
    }

    // Check every 5 seconds
    setTimeout(() => this.monitor(bookmakers), 5000);
  }
}

// Usage
const alerter = new ValueBetAlerter(process.env.ODDS_API_KEY, 0.03);
alerter.monitor(['Bet365', 'Unibet', 'SingBet']);
```

## Best Practices

<AccordionGroup>
  <Accordion title="Set Realistic EV Thresholds">
    Start with a minimum EV of 3-5%. Lower thresholds will generate more alerts but may include less significant opportunities.
  </Accordion>

  <Accordion title="Monitor Multiple Bookmakers">
    Different bookmakers have different inefficiencies. Monitor several bookmakers to maximize opportunities.
  </Accordion>

  <Accordion title="Act Quickly">
    Value bets can disappear quickly as bookmakers adjust odds. Implement fast notification systems.
  </Accordion>

  <Accordion title="Track Performance">
    Log all value bets and outcomes to analyze the accuracy of the expected value calculations over time.
  </Accordion>

  <Accordion title="Consider Stake Sizing">
    Use the Kelly Criterion or similar methods to determine optimal stake sizes based on expected value.
  </Accordion>
</AccordionGroup>

## Kelly Criterion Example

Calculate optimal stake using the Kelly Criterion:

```javascript theme={null}
function calculateKellyStake(probability, odds, bankroll, kellyFraction = 0.25) {
  // Kelly = (probability * odds - 1) / (odds - 1)
  const kelly = (probability * odds - 1) / (odds - 1);

  // Use fractional Kelly for safety (e.g., 25% of full Kelly)
  const fractionalKelly = kelly * kellyFraction;

  // Calculate stake
  const stake = bankroll * fractionalKelly;

  return Math.max(0, stake); // Don't bet if negative
}

// Example
const bet = valueBets[0];
const impliedProb = 1 / parseFloat(bet.bookmakerOdds[bet.betSide]);
const trueProbability = impliedProb * (1 + bet.expectedValue);
const odds = parseFloat(bet.bookmakerOdds[bet.betSide]);
const bankroll = 1000;

const stake = calculateKellyStake(trueProbability, odds, bankroll);
console.log(`Recommended stake: $${stake.toFixed(2)}`);
```

## Limitations & Considerations

<Warning>
  * Value bets are **theoretical** - actual profitability depends on many factors
  * Bookmakers may limit accounts that consistently find value
  * Odds can change between viewing and placing a bet
  * Not all value bets will win (that's the nature of probability)
</Warning>

## Next Steps

<CardGroup cols={2}>
  <Card title="Fetching Odds" icon="chart-line" href="/guides/fetching-odds">
    Learn more about working with odds data
  </Card>

  <Card title="Best Practices" icon="lightbulb" href="/guides/best-practices">
    Optimize your API usage
  </Card>
</CardGroup>


> ## Documentation Index
> Fetch the complete documentation index at: https://docs.odds-api.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Dropping Odds

> Track significant odds movements from sharp bookmakers to identify where the market is moving before recreational books adjust.

## What are Dropping Odds?

Dropping odds occur when bookmakers significantly lower the odds on a particular outcome, indicating increased confidence that the outcome will happen. We track these movements from sharp bookmakers only, filtering out the noise from recreational books to give you a reliable picture of where the market is actually moving.

## Why Sharp Bookmakers?

Not every odds change is meaningful. Soft books adjust lines for all sorts of reasons: liability balancing, promos, copying other books. Sharp books move because the market moved.

Our dropping odds come from a curated panel of sharp bookmakers. These are high-limit operators with tight margins that accept professional-level stakes. Their lines get tested by sharp bettors constantly, so when they move a price, it usually means something real happened: confirmed team news, injury updates, or significant money entering the market.

By filtering to these operators, the data shows you where the smart money is going rather than noise from recreational books.

## Fetching Dropping Odds

Use the `/v3/dropping-odds` endpoint to get current dropping odds:

<CodeGroup>
  ```javascript JavaScript theme={null}
  const apiKey = process.env.ODDS_API_KEY;

  const response = await fetch(
    `https://api.odds-api.io/v3/dropping-odds?apiKey=${apiKey}&sport=football&minDrop=10&includeEventDetails=true`
  );

  const droppingOdds = await response.json();
  console.log(droppingOdds);
  ```

  ```python Python theme={null}
  import requests
  import os

  api_key = os.environ['ODDS_API_KEY']

  response = requests.get(
      'https://api.odds-api.io/v3/dropping-odds',
      params={
          'apiKey': api_key,
          'sport': 'football',
          'minDrop': 10,
          'includeEventDetails': True
      }
  )

  dropping_odds = response.json()
  print(dropping_odds)
  ```
</CodeGroup>

## Response Format

```json theme={null}
[
  {
    "eventId": 69455182,
    "event": {
      "home": "Manchester City",
      "away": "Arsenal",
      "date": "2025-10-15T15:00:00Z",
      "sport": { "name": "Football", "slug": "football" },
      "league": { "name": "England - Premier League", "slug": "england-premier-league" }
    },
    "market": { "name": "Spread", "hdp": -1.5 },
    "betSide": "home",
    "odds": {
      "opening": 2.05,
      "current": 1.52,
      "drop": {
        "sinceOpening": 25.9,
        "12h": 8.4,
        "24h": 12.3,
        "48h": null
      }
    },
    "lastMovedAt": 1775851240182,
    "updatedAt": 1775854172851
  },
  {
    "eventId": 61301179,
    "market": { "name": "Player Passes", "hdp": 34.5, "label": "Carlos Baleba" },
    "betSide": "over",
    "odds": {
      "opening": 3.75,
      "current": 1.5,
      "drop": { "sinceOpening": 60, "12h": null, "24h": null, "48h": null }
    },
    "lastMovedAt": 1776281915401,
    "updatedAt": 1776283503652
  }
]
```

For player prop markets, `market.label` contains the player name (e.g. `"Carlos Baleba"`). It is omitted for non-player-prop markets.

## Understanding Drop Values

The `drop` object shows the percentage decrease across different time windows:

| Field          | Description                                               |
| -------------- | --------------------------------------------------------- |
| `sinceOpening` | Total drop since the opening odds were first recorded     |
| `12h`          | Drop in the last 12 hours (null if no 12h data available) |
| `24h`          | Drop in the last 24 hours                                 |
| `48h`          | Drop in the last 48 hours                                 |

A drop of 25.9% means the odds went from 2.05 to 1.52. The market now considers this outcome significantly more likely.

## Query Parameters

| Param                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Default     |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `sport`               | Sport slug (e.g. `football`, `basketball`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | All sports  |
| `league`              | League slug (requires `sport`). e.g. `england-premier-league`. Mutually exclusive with `leagues`.                                                                                                                                                                                                                                                                                                                                                                                                                     | All leagues |
| `leagues`             | Comma-separated league slugs to filter by multiple leagues at once. e.g. `england-premier-league,spain-la-liga`. Mutually exclusive with `league`.                                                                                                                                                                                                                                                                                                                                                                    | All leagues |
| `markets`             | Comma-separated market names to filter by. Case-insensitive. e.g. `Spread,Totals`. Supported: `ML`, `Spread`, `Totals`, `Spread HT`, `Totals HT`, `Totals 1Q`, `Spread 1Q`, `Team Total Home`, `Team Total Away`, `Corners Spread`, `Corners Totals`, `Corners Spread HT`, `Corners Totals HT`, `Bookings Spread`, `Bookings Totals`, `Player Props`. Using `Player Props` returns all player prop markets across all sports — for football this includes `Anytime Goalscorer`, `Player Passes`, `Player Shots`, etc. | All markets |
| `timeWindow`          | Sort/filter by time window: `opening`, `12h`, `24h`, `48h`                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `opening`   |
| `sort`                | Sort order: `drop` (highest %), `recent` (latest movement), `kickoff` (soonest event)                                                                                                                                                                                                                                                                                                                                                                                                                                 | `drop`      |
| `minDrop`             | Minimum drop percentage to include                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `0`         |
| `limit`               | Results per page (max 200)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `50`        |
| `page`                | Page number (1-indexed)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `1`         |
| `includeEventDetails` | Include event details (home, away, date, sport, league)                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `false`     |

## Pagination

Results are paginated. Metadata is returned in response headers:

| Header          | Description                             |
| --------------- | --------------------------------------- |
| `X-Total-Count` | Total number of matching entries        |
| `X-Page`        | Current page number                     |
| `X-Per-Page`    | Results per page                        |
| `X-Updated-At`  | Timestamp of last data update (Unix ms) |

## Use Cases

### Steam Moves

Track large, sudden movements to catch "steam" (when sharp bettors flood a market):

```javascript theme={null}
const response = await fetch(
  `https://api.odds-api.io/v3/dropping-odds?apiKey=${apiKey}&timeWindow=12h&minDrop=15&sport=football`
);
const steamMoves = await response.json();

steamMoves.forEach(move => {
  console.log(`🔥 ${move.event.home} vs ${move.event.away}`);
  console.log(`   ${move.market.name} ${move.betSide}: ${move.odds.opening} → ${move.odds.current} (↓${move.odds.drop['12h']}% in 12h)`);
});
```

### Pre-Match Line Shopping

Combine with the odds endpoint to find bookmakers that haven't adjusted yet:

```javascript theme={null}
// 1. Get dropping odds
const drops = await fetch(
  `https://api.odds-api.io/v3/dropping-odds?apiKey=${apiKey}&minDrop=10&limit=20`
).then(r => r.json());

// 2. For interesting drops, check all bookmaker odds
for (const drop of drops) {
  const odds = await fetch(
    `https://api.odds-api.io/v3/odds?apiKey=${apiKey}&eventId=${drop.eventId}`
  ).then(r => r.json());

  // Find bookmakers still offering higher odds
  // (they haven't caught up to the sharp move yet)
}
```

## Best Practices

<AccordionGroup>
  <Accordion title="Focus on 12h and 24h Windows">
    The `sinceOpening` window can be noisy for events listed far in advance. The 12h and 24h windows capture more actionable, recent movements.
  </Accordion>

  <Accordion title="Combine with Value Bets">
    A dropping odd on a sharp book often creates value on soft bookmakers that haven't adjusted yet. Use `/value-bets` alongside `/dropping-odds` for the best opportunities.
  </Accordion>

  <Accordion title="Filter by Market">
    Moneyline drops are the most common. Spread and totals drops can be more significant since they indicate specific information (e.g. a key player being ruled out affecting the handicap).
  </Accordion>

  <Accordion title="Monitor Close to Kick-off">
    The most informative drops happen in the final 1-6 hours before an event starts, when team news is confirmed and sharp bettors act on confirmed information.
  </Accordion>
</AccordionGroup>

## Next Steps

<CardGroup cols={2}>
  <Card title="Value Bets" icon="chart-line" href="/guides/value-bets">
    Find edges using the same sharp bookmaker methodology
  </Card>

  <Card title="Fetching Odds" icon="magnifying-glass" href="/guides/fetching-odds">
    Get full odds data across all bookmakers
  </Card>
</CardGroup>


> ## Documentation Index
> Fetch the complete documentation index at: https://docs.odds-api.io/llms.txt
> Use this file to discover all available pages before exploring further.

# WebSocket Real-Time Feed

> Stream real-time betting odds via WebSocket instead of polling. Get instant updates when odds change and build responsive live betting apps.

# Odds API WebSocket

The WebSocket feed delivers the exact same response format as the `/odds` endpoint, but in **real time**. Instead of polling, you receive updates instantly whenever odds change.

We recommend all clients move to WebSocket for efficiency and lower latency. It reduces request overhead, scales better, and gives you immediate updates for live markets.

## Why Use WebSocket?

<CardGroup cols={2}>
  <Card title="Real-Time Updates" icon="bolt">
    Receive odds changes instantly without polling
  </Card>

  <Card title="Lower Latency" icon="gauge-high">
    Sub-150ms updates for live markets
  </Card>

  <Card title="Reduced Overhead" icon="chart-line-down">
    Single persistent connection vs repeated HTTP calls
  </Card>

  <Card title="Better Scaling" icon="arrows-maximize">
    Perfect for bots, live dashboards, and in-play betting apps
  </Card>
</CardGroup>

## Access & Pricing

<Note>
  **Add-on Feature**: WebSocket access is available as an add-on. Subscribe through [odds-api.io](https://odds-api.io) to enable it for your account.
</Note>

**Pricing:** 2x the REST API price

**Bookmakers:** The WebSocket automatically sends updates for all bookmakers you have selected in your account. You can manage your selected bookmakers via the `/bookmakers/selected/select` endpoint or through the [dashboard](https://odds-api.io).

## Connection Details

**Endpoint:**

```
wss://api.odds-api.io/v3/ws?apiKey=YOUR_API_KEY
```

**Authentication:**

* API key passed as query parameter
* One connection per API key
* New connections automatically close older ones
* Automatic cleanup keeps your feed stable

## Filter Parameters

<Warning>
  The `markets` parameter is **required for the odds channel** (the default). It is not needed when subscribing only to `scores`/`status`.
</Warning>

| Parameter  | Type            | Max | Description                                                                |
| ---------- | --------------- | --- | -------------------------------------------------------------------------- |
| `markets`  | comma-separated | 20  | **Required for the odds channel.** Market names (e.g., `ML,Spread,Totals`) |
| `channels` | comma-separated | -   | `odds`, `scores`, `status`. Defaults to `odds`.                            |
| `sport`    | comma-separated | 10  | Filter by sport slugs (e.g., `football,basketball`)                        |
| `leagues`  | comma-separated | 20  | Filter by league slugs (e.g., `england-premier-league`)                    |
| `eventIds` | comma-separated | 50  | Filter by specific event IDs                                               |
| `status`   | single value    | -   | `live` or `prematch`                                                       |

<Note>
  Using `leagues` or `eventIds` is recommended to reduce bandwidth. You cannot use both together.
</Note>

### Channels

Subscribe to one or more streams with `channels`. **Omitting it keeps the default `odds` stream**, so existing connections are unchanged. Add `scores` and/or `status` for live event state:

<Warning>
  `channels` is an **allowlist**: you receive **only** the channels you list. To keep odds, include `odds` (e.g. `channels=odds,scores,status`); `channels=scores,status` alone stops odds delivery.
</Warning>

* **`odds`** (default): `created`, `updated`, `deleted`, `no_markets`
* **`scores`**: `score` messages on every score change
* **`status`**: `status` messages on `pending` (new match added), `live`, `settled`, `cancelled` (carries the current scores, so you get the final result on settle)

`score`/`status` are event-level (no `bookie`/`markets`), best-effort (no `seq`, not replayed). See the [WebSocket API reference](/api-reference/websocket#channels) for full details.

```bash theme={null}
# Odds + scores + status
wss://api.odds-api.io/v3/ws?apiKey=xxx&channels=odds,scores,status&markets=ML
# Scoreboard only
wss://api.odds-api.io/v3/ws?apiKey=xxx&channels=scores,status&sport=football
```

### Example Connection URLs

```bash theme={null}
# All live football events with main markets only
wss://api.odds-api.io/v3/ws?apiKey=xxx&sport=football&status=live&markets=ML,Spread,Totals

# Specific leagues
wss://api.odds-api.io/v3/ws?apiKey=xxx&leagues=england-premier-league,spain-la-liga&markets=ML

# Specific events
wss://api.odds-api.io/v3/ws?apiKey=xxx&eventIds=12345,67890,11111

# Multiple sports, prematch only
wss://api.odds-api.io/v3/ws?apiKey=xxx&sport=football,basketball,tennis&status=prematch
```

### Welcome Message

Upon successful connection, you'll receive a welcome message confirming your active filters:

```json theme={null}
{
  "type": "welcome",
  "message": "Connected to OddsAPI WebSocket",
  "user_id": "user123",
  "bookmakers": ["Bet365", "Pinnacle"],
  "sport_filter": ["Football"],
  "leagues_filter": ["england-premier-league"],
  "event_id_filter": [],
  "status_filter": "live",
  "market_filter": ["ML", "SPREAD", "TOTALS"],
  "channels": ["odds", "scores", "status"],
  "connected_at": "2026-01-15T21:00:00Z",
  "warning": "..."
}
```

### Error Responses

If your connection parameters are invalid, you'll receive a `400 Bad Request` with one of these errors:

| Error Message                                                | Cause                     |
| ------------------------------------------------------------ | ------------------------- |
| `Too many sports. Maximum 10 allowed.`                       | Exceeded sport limit      |
| `Too many leagues. Maximum 20 allowed.`                      | Exceeded league limit     |
| `Too many event IDs. Maximum 50 allowed.`                    | Exceeded eventIds limit   |
| `Too many markets. Maximum 20 allowed.`                      | Exceeded market limit     |
| `Cannot use both 'leagues' and 'eventIds' filters together.` | Mutual exclusion violated |
| `Invalid status filter. Use 'prematch' or 'live'`            | Invalid status value      |
| `Invalid channel: X. Allowed: odds, scores, status`          | Unknown channel           |

## Update Types

Messages come in as JSON objects. Each has a `type` field:

| Type         | Channel | Description                                                                                       |
| ------------ | ------- | ------------------------------------------------------------------------------------------------- |
| `created`    | odds    | New match added                                                                                   |
| `updated`    | odds    | Match or market changed                                                                           |
| `deleted`    | odds    | Match removed                                                                                     |
| `no_markets` | odds    | Match exists but currently no markets available                                                   |
| `score`      | scores  | Live score changed. Payload `{ id, type, scores, timestamp }` (no status field)                   |
| `status`     | status  | Status changed to `pending` (new match added), `live`, `settled`, or `cancelled` (carries scores) |

## Message Format

Each message includes a `seq` field: a globally unique, monotonically increasing sequence number. Use this to detect gaps and to reconnect without missing updates (see [Reconnection with Replay](#reconnection-with-replay) below).

```json theme={null}
{
  "type": "updated",
  "seq": 482917,
  "timestamp": 1723992773,
  "id": "63017989",
  "bookie": "SingBet",
  "url": "https://www.singbet.com/sports/football/match/63017989",
  "markets": [
    {
      "name": "ML",
      "updatedAt": "2024-01-15T10:30:00Z",
      "odds": [
        {
          "home": "1.85",
          "draw": "3.25",
          "away": "2.10",
          "max": 500
        }
      ]
    },
    {
      "name": "Totals",
      "updatedAt": "2024-01-15T10:30:00Z",
      "odds": [
        {
          "hdp": 2.5,
          "over": "1.85",
          "under": "2.10",
          "max": 500
        }
      ]
    }
  ]
}
```

## Quick Start

### JavaScript Example

<CodeGroup>
  ```javascript Node.js theme={null}
  const WebSocket = require('ws');

  const apiKey = process.env.ODDS_API_KEY;

  // Build connection URL with filters
  const params = new URLSearchParams({
    apiKey,
    markets: 'ML,Spread,Totals',
    sport: 'football',
    status: 'live'
  });

  const ws = new WebSocket(`wss://api.odds-api.io/v3/ws?${params}`);

  ws.onopen = () => {
    console.log("Connected to Odds-API WebSocket");
  };

  ws.onclose = () => {
    console.log("Disconnected from WebSocket");
  };

  ws.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "welcome") {
      console.log("Connected:", data.message);
      console.log("Active filters:", {
        sports: data.sport_filter,
        leagues: data.leagues_filter,
        status: data.status_filter,
        markets: data.market_filter
      });
    } else if (data.type === "updated") {
      console.log(`Match ID: ${data.id}`);
      console.log(`Bookmaker: ${data.bookie}`);
      console.log(`Markets: ${data.markets.length}`);

      // Process each market
      data.markets.forEach(market => {
        console.log(`  ${market.name}:`, market.odds[0]);
      });
    }
  };
  ```

  ```javascript Browser theme={null}
  const apiKey = 'YOUR_API_KEY';

  // Build connection URL with filters
  const params = new URLSearchParams({
    apiKey,
    markets: 'ML,Spread,Totals',
    leagues: 'england-premier-league,spain-la-liga'
  });

  const ws = new WebSocket(`wss://api.odds-api.io/v3/ws?${params}`);

  ws.onopen = () => console.log("Connected");
  ws.onclose = () => console.log("Disconnected");
  ws.onerror = (err) => console.error("Error:", err);

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "updated") {
      console.log(`Match: ${data.id}`);
      console.log(`Bookie: ${data.bookie}`);
      console.log(`Markets: ${data.markets.length}`);
    }
  };
  ```
</CodeGroup>

### Python Example

```python theme={null}
import websocket
import json
import os
from urllib.parse import urlencode

api_key = os.environ['ODDS_API_KEY']

# Build connection URL with filters
params = urlencode({
    'apiKey': api_key,
    'markets': 'ML,Spread,Totals',
    'sport': 'football',
    'status': 'live'
})

def on_open(ws):
    print("Connected to Odds-API WebSocket")

def on_message(ws, message):
    data = json.loads(message)

    if data['type'] == 'welcome':
        print(f"Connected: {data['message']}")
        print(f"Active filters: sports={data['sport_filter']}, "
              f"status={data['status_filter']}, markets={data['market_filter']}")

    elif data['type'] == 'updated':
        print(f"Match ID: {data['id']}")
        print(f"Bookmaker: {data['bookie']}")
        print(f"Markets: {len(data['markets'])}")

        # Process each market
        for market in data['markets']:
            print(f"  {market['name']}: {market['odds'][0]}")

def on_error(ws, error):
    print(f"Error: {error}")

def on_close(ws, close_status_code, close_msg):
    print("Disconnected from WebSocket")

# Create WebSocket connection
ws = websocket.WebSocketApp(
    f"wss://api.odds-api.io/v3/ws?{params}",
    on_open=on_open,
    on_message=on_message,
    on_error=on_error,
    on_close=on_close
)

# Run forever
ws.run_forever()
```

### PHP Example

```php theme={null}
<?php
use WebSocket\Client;

$apiKey = getenv('ODDS_API_KEY');
$params = http_build_query([
    'apiKey' => $apiKey,
    'markets' => 'ML,Spread,Totals',
    'sport' => 'football',
    'status' => 'live'
]);

$client = new Client("wss://api.odds-api.io/v3/ws?{$params}");

while (true) {
    try {
        $data = json_decode($client->receive(), true);

        if ($data['type'] === 'welcome') {
            echo "Connected! Filters: " . implode(', ', $data['sport_filter']) . "\n";
        } elseif ($data['type'] === 'updated') {
            echo "Match ID: {$data['id']} at {$data['bookie']}\n";
            foreach ($data['markets'] as $market) {
                echo "  {$market['name']}: " . json_encode($market['odds'][0]) . "\n";
            }
        }
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
        break;
    }
}
```

## Handling Different Update Types

```javascript theme={null}
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case 'welcome':
      console.log(`Connected: ${data.message}`);
      console.log(`User ID: ${data.user_id}`);
      console.log(`Bookmakers: ${data.bookmakers.join(', ')}`);
      console.log(`Filters: sports=${data.sport_filter}, status=${data.status_filter}`);
      if (data.warning) {
        console.warn(`Warning: ${data.warning}`);
      }
      break;

    case 'created':
      console.log(`New match created: ${data.id} at ${data.bookie}`);
      // Add match to your database/UI
      break;

    case 'updated':
      console.log(`Match updated: ${data.id} at ${data.bookie}`);
      // Update existing match odds
      updateMatchOdds(data.id, data.bookie, data.markets);
      break;

    case 'deleted':
      console.log(`Match deleted: ${data.id} at ${data.bookie}`);
      // Remove match from your database/UI
      break;

    case 'no_markets':
      console.log(`No markets available for match: ${data.id}`);
      // Handle temporarily unavailable markets
      break;

    default:
      console.log('Unknown message type:', data.type);
  }
};

function updateMatchOdds(matchId, bookmaker, markets) {
  markets.forEach(market => {
    console.log(`${market.name} updated at ${market.updatedAt}:`, market.odds[0]);

    // Update your UI or database here
    // Example: store latest odds for comparison
    const odds = market.odds[0];
    if (market.name === 'ML') {
      console.log(`  Home: ${odds.home}, Draw: ${odds.draw}, Away: ${odds.away}`);
    } else if (market.name === 'Totals') {
      console.log(`  Over ${odds.hdp}: ${odds.over}, Under: ${odds.under}`);
    }
  });
}
```

## Advanced Implementation: Live Odds Tracker

```javascript theme={null}
class LiveOddsTracker {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey;
    this.options = {
      markets: 'ML,Spread,Totals',
      sport: null,
      leagues: null,
      eventIds: null,
      status: null,
      ...options
    };
    this.ws = null;
    this.matches = new Map();
    this.lastSeq = 0;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  buildUrl() {
    const params = new URLSearchParams({ apiKey: this.apiKey });
    if (this.options.markets) params.set('markets', this.options.markets);
    if (this.options.sport) params.set('sport', this.options.sport);
    if (this.options.leagues) params.set('leagues', this.options.leagues);
    if (this.options.eventIds) params.set('eventIds', this.options.eventIds);
    if (this.options.status) params.set('status', this.options.status);
    if (this.lastSeq > 0) params.set('lastSeq', String(this.lastSeq));
    return `wss://api.odds-api.io/v3/ws?${params}`;
  }

  connect() {
    this.ws = new WebSocket(this.buildUrl());

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      this.handleMessage(JSON.parse(event.data));
    };

    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  handleMessage(data) {
    if (data.type === 'welcome') {
      this.onWelcome(data);
      return;
    }

    if (data.type === 'resync_required') {
      console.log('Resync required:', data.reason);
      // Rebuild state from REST snapshot, then reconnect
      return;
    }

    // Track sequence number for gap-free reconnection
    if (data.seq) {
      this.lastSeq = data.seq;
    }

    const key = `${data.id}-${data.bookie}`;

    switch (data.type) {
      case 'created':
        this.matches.set(key, {
          id: data.id,
          bookmaker: data.bookie,
          markets: data.markets,
          timestamp: data.timestamp
        });
        this.onMatchCreated(data);
        break;

      case 'updated':
        const existing = this.matches.get(key);
        if (existing) {
          existing.markets = data.markets;
          existing.timestamp = data.timestamp;
          this.onMatchUpdated(data, existing);
        }
        break;

      case 'deleted':
        this.matches.delete(key);
        this.onMatchDeleted(data);
        break;

      case 'no_markets':
        this.onNoMarkets(data);
        break;
    }
  }

  // Override these methods in your implementation
  onWelcome(data) {
    console.log(`Connected: ${data.message}`);
    console.log(`Filters: sports=${data.sport_filter}, status=${data.status_filter}`);
  }

  onMatchCreated(data) {
    console.log(`New match: ${data.id} at ${data.bookie}`);
  }

  onMatchUpdated(data, previousData) {
    console.log(`Updated: ${data.id} at ${data.bookie}`);
  }

  onMatchDeleted(data) {
    console.log(`Deleted: ${data.id} at ${data.bookie}`);
  }

  onNoMarkets(data) {
    console.log(`No markets: ${data.id}`);
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

      console.log(`Reconnecting in ${delay}ms... (Attempt ${this.reconnectAttempts})`);

      setTimeout(() => this.connect(), delay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  getMatchOdds(matchId, bookmaker) {
    return this.matches.get(`${matchId}-${bookmaker}`);
  }

  getAllMatches() {
    return Array.from(this.matches.values());
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

// Usage
const tracker = new LiveOddsTracker(process.env.ODDS_API_KEY, {
  markets: 'ML,Spread,Totals',
  sport: 'football',
  status: 'live'
});
tracker.connect();
```

## React Integration

```jsx theme={null}
import { useEffect, useState, useRef } from 'react';

function useLiveOdds(apiKey, options = {}) {
  const [odds, setOdds] = useState({});
  const [connected, setConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams({ apiKey });
    if (options.markets) params.set('markets', options.markets);
    if (options.sport) params.set('sport', options.sport);
    if (options.leagues) params.set('leagues', options.leagues);
    if (options.status) params.set('status', options.status);

    ws.current = new WebSocket(`wss://api.odds-api.io/v3/ws?${params}`);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'welcome') {
        setConnected(true);
      } else if (data.type === 'updated' || data.type === 'created') {
        setOdds(prev => ({
          ...prev,
          [`${data.id}-${data.bookie}`]: {
            id: data.id,
            bookmaker: data.bookie,
            markets: data.markets
          }
        }));
      } else if (data.type === 'deleted') {
        setOdds(prev => {
          const next = { ...prev };
          delete next[`${data.id}-${data.bookie}`];
          return next;
        });
      }
    };

    ws.current.onclose = () => setConnected(false);

    return () => ws.current?.close();
  }, [apiKey, options.markets, options.sport, options.leagues, options.status]);

  return { odds, connected };
}

// Component
function LiveOddsDisplay() {
  const { odds, connected } = useLiveOdds(process.env.REACT_APP_ODDS_API_KEY, {
    markets: 'ML,Spread,Totals',
    sport: 'football',
    status: 'live'
  });

  return (
    <div>
      <div className={connected ? 'connected' : 'disconnected'}>
        {connected ? 'Connected' : 'Disconnected'}
      </div>
      <div className="matches">
        {Object.values(odds).map(match => (
          <div key={`${match.id}-${match.bookmaker}`}>
            <h3>Match #{match.id} - {match.bookmaker}</h3>
            {match.markets.map(market => (
              <div key={market.name}>
                <strong>{market.name}:</strong> {JSON.stringify(market.odds[0])}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Reconnection with Replay

When your client disconnects and reconnects, you can resume from where you left off using the `lastSeq` parameter. The server will replay any messages you missed during the disconnection.

### How It Works

1. Track the `seq` field from every message you receive
2. When reconnecting, pass the last seq you received as a query parameter: `lastSeq=482917`
3. The server sends a burst of missed messages before resuming the live stream
4. After the replay burst, live updates continue as normal with no gap

### Connection URL with Replay

```bash theme={null}
wss://api.odds-api.io/v3/ws?apiKey=xxx&markets=ML,Spread,Totals&lastSeq=482917
```

### Replay Behavior

* **Compacted latest-state replay**: You receive the most recent state for each `eventId:bookie` combination, not every intermediate tick. If odds changed multiple times while you were disconnected, you get the final value only. This is correct for state sync; trading clients who need every tick should use `/odds/movements` per event.
* The replay burst is delivered as a batch of messages immediately after the welcome message
* Messages are filtered through your active filters (sport, leagues, markets, etc.), so you only receive updates relevant to your session
* `deleted` and `no_markets` updates are replayed as latest state. If an event was deleted while you were disconnected, you will receive the deletion during replay
* Replay data is retained for up to 24 hours
* The burst is size-limited (512KB per frame, up to 100 messages per frame) and sent as fast as the connection allows

### Replay Limits and Resync

If the replay cannot be served reliably, the server will **not** silently truncate. Instead, it sends a `resync_required` message and closes the connection. This happens when:

* **Too many replay candidates** (`reason: "replay_limit_exceeded"`): the gap between your `lastSeq` and the current seq produced more updates than the server will process
* **Expired replay data** (`reason: "replay_window_expired"`): one or more replay payloads have aged out of the retention window, which would leave gaps in the catch-up

```json theme={null}
{
  "type": "resync_required",
  "reason": "replay_limit_exceeded",
  "last_seq": 48291000,
  "current_seq": 48295000
}
```

**When you receive `resync_required`, rebuild your state from REST:**

1. Fetch a fresh snapshot from `/odds` or `/odds/multi` with `includeSeq=true`
2. Read the `X-OddsAPI-Seq` response header
3. Reconnect to the WebSocket with `lastSeq` set to that value
4. You are now caught up with no gap

### Example: Reconnect with Replay

```javascript theme={null}
class ReconnectingClient {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey;
    this.options = options;
    this.lastSeq = 0;
  }

  buildUrl() {
    const params = new URLSearchParams({ apiKey: this.apiKey });
    if (this.options.markets) params.set('markets', this.options.markets);
    if (this.options.sport) params.set('sport', this.options.sport);
    if (this.lastSeq > 0) params.set('lastSeq', String(this.lastSeq));
    return `wss://api.odds-api.io/v3/ws?${params}`;
  }

  connect() {
    this.ws = new WebSocket(this.buildUrl());

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Handle resync_required: rebuild from REST snapshot
      if (data.type === 'resync_required') {
        console.log('Resync required:', data.reason);
        this.resyncFromRest();
        return;
      }

      // Track seq from every update
      if (data.seq) {
        this.lastSeq = data.seq;
      }

      // Process the message
      this.handleMessage(data);
    };

    this.ws.onclose = () => {
      // Reconnect with lastSeq to get missed messages
      setTimeout(() => this.connect(), 1000);
    };
  }

  async resyncFromRest() {
    // Fetch fresh snapshot with seq cursor
    const res = await fetch(
      `https://api.odds-api.io/v3/odds/multi?apiKey=${this.apiKey}&includeSeq=true`
    );
    const seq = res.headers.get('X-OddsAPI-Seq');
    if (seq) {
      this.lastSeq = parseInt(seq, 10);
    }
    // Rebuild local state from response...
    const data = await res.json();
    this.rebuildState(data);
    // Reconnect with the snapshot seq
    setTimeout(() => this.connect(), 100);
  }
}
```

### REST to WebSocket Handoff

You can obtain a seq cursor from REST API responses by adding `includeSeq=true` to the snapshot odds endpoints (`/odds`, `/odds/multi`). The current sequence number is returned in the `X-OddsAPI-Seq` response header.

```bash theme={null}
curl -H "Accept: application/json" \
  "https://api.odds-api.io/v3/odds?apiKey=xxx&eventId=123&bookmakers=Bet365&includeSeq=true"

# Response header: X-OddsAPI-Seq: 482900
```

Use this seq value as `lastSeq` when opening your WebSocket connection to ensure no updates are missed between the REST snapshot and the live stream.

## Best Practices

<AccordionGroup>
  <Accordion title="Use Filters to Reduce Bandwidth">
    Use `leagues` or `eventIds` filters when you only need specific data. This significantly reduces bandwidth and improves performance.
  </Accordion>

  <Accordion title="Implement Reconnection Logic">
    Use `lastSeq` for gap-free reconnection. Always implement exponential backoff as a fallback. The connection is stable, but networks can drop.
  </Accordion>

  <Accordion title="Handle All Message Types">
    Handle `welcome`, `created`, `updated`, `deleted`, and `no_markets` to keep your data in sync.
  </Accordion>

  <Accordion title="One Connection Per API Key">
    New connections automatically close older ones. Don't create multiple connections with the same API key.
  </Accordion>

  <Accordion title="Process Updates Asynchronously">
    If receiving many updates, process them asynchronously to avoid blocking your main thread.
  </Accordion>
</AccordionGroup>

## Benefits Over REST API

| Feature           | REST API                  | WebSocket                    |
| ----------------- | ------------------------- | ---------------------------- |
| Latency           | 100-500ms (polling)       | \<150ms (push)               |
| Request overhead  | Multiple HTTP requests    | Single persistent connection |
| Real-time updates | Manual polling            | Automatic push               |
| Bandwidth         | Higher (repeated headers) | Lower (single connection)    |
| Server load       | Higher                    | Lower                        |
| Best for          | Batch requests            | Live updates                 |

## Get Access

<Card title="Enable WebSocket Access" icon="bolt" href="https://odds-api.io">
  Subscribe to WebSocket as an add-on through your odds-api.io account
</Card>

## Next Steps

<CardGroup cols={2}>
  <Card title="Fetching Odds" icon="chart-line" href="/guides/fetching-odds">
    Learn about REST API odds fetching
  </Card>

  <Card title="Best Practices" icon="lightbulb" href="/guides/best-practices">
    Optimize your implementation
  </Card>

  <Card title="Value Bets" icon="magnifying-glass-dollar" href="/guides/value-bets">
    Identify profitable opportunities
  </Card>

  <Card title="API Reference" icon="code" href="/api-reference/introduction">
    Explore all API endpoints
  </Card>
</CardGroup>


> ## Documentation Index
> Fetch the complete documentation index at: https://docs.odds-api.io/llms.txt
> Use this file to discover all available pages before exploring further.

# SDKs & Libraries

> Official SDKs, wrappers, and tools for Odds-API.io. Get started faster with our Python, Node.js, and MCP integrations.

Use our official SDKs to integrate Odds-API.io into your project in minutes. Each SDK wraps the full REST API with type safety, error handling, and built-in best practices.

## Official SDKs

<CardGroup cols={2}>
  <Card title="Python SDK" icon="python" href="https://github.com/odds-api-io/odds-api-python">
    Full-featured Python client with sync and async support. Available on PyPI.
  </Card>

  <Card title="Node.js SDK" icon="node-js" href="https://github.com/odds-api-io/odds-api-node">
    TypeScript-first SDK with full type definitions. Works with ESM and CommonJS.
  </Card>

  <Card title="MCP Server" icon="robot" href="https://github.com/odds-api-io/odds-api-mcp-server">
    Model Context Protocol server for AI tools like Claude, Cursor, and VS Code.
  </Card>
</CardGroup>

***

## Python

Install the SDK:

```bash theme={null}
pip install odds-api-io
```

### Quick Start

```python theme={null}
from odds_api import OddsAPIClient

client = OddsAPIClient(api_key="YOUR_API_KEY")

# Get all sports
sports = client.get_sports()

# Get Premier League events
events = client.get_events(sport="football", league="england-premier-league")

# Get odds from multiple bookmakers
odds = client.get_event_odds(
    event_id=events[0]['id'],
    bookmakers="Bet365,SingBet,FanDuel"
)

# Display odds with direct bet links
for bookie, markets in odds['bookmakers'].items():
    ml = next((m for m in markets if m['name'] == 'ML'), None)
    if ml:
        o = ml['odds'][0]
        print(f"{bookie}: H {o['home']} | D {o['draw']} | A {o['away']}")

# Direct bet links
for bookie, url in odds.get('urls', {}).items():
    print(f"  Bet at {bookie}: {url}")
```

### Async Support

```python theme={null}
import asyncio
from odds_api import AsyncOddsAPIClient

async def main():
    async with AsyncOddsAPIClient(api_key="YOUR_API_KEY") as client:
        sports = await client.get_sports()
        events = await client.get_events(sport="basketball", league="usa-nba")
        print(f"Found {len(events)} NBA events")

asyncio.run(main())
```

### Find Value Bets

```python theme={null}
value_bets = client.get_value_bets(
    bookmaker="Bet365",
    include_event_details=True
)

for bet in sorted(value_bets, key=lambda x: x['expectedValue'], reverse=True)[:5]:
    ev = bet['expectedValue'] - 100
    print(f"+{ev:.1f}% EV | {bet['market']['name']} | {bet['betSide']} @ {bet['bookmakerOdds'][bet['betSide']]}")
    print(f"  Bet link: {bet['bookmakerOdds'].get('href', 'N/A')}")
```

<Card title="View on GitHub" icon="github" href="https://github.com/odds-api-io/odds-api-python">
  Full documentation, examples, and API reference.
</Card>

***

## Node.js / TypeScript

Install the SDK:

```bash theme={null}
npm install odds-api-io
```

### Quick Start (TypeScript)

```typescript theme={null}
import { OddsAPIClient } from 'odds-api-io';

const client = new OddsAPIClient({ apiKey: 'YOUR_API_KEY' });

// Get all sports
const sports = await client.getSports();

// Get Premier League events
const events = await client.getEvents({
  sport: 'football',
  league: 'england-premier-league',
});

// Get odds from multiple bookmakers
const odds = await client.getEventOdds({
  eventId: events[0].id,
  bookmakers: 'Bet365,SingBet,FanDuel',
});

// Display odds with direct bet links
for (const [bookie, markets] of Object.entries(odds.bookmakers)) {
  const ml = markets.find(m => m.name === 'ML');
  if (ml?.odds?.[0]) {
    const o = ml.odds[0];
    console.log(`${bookie}: H ${o.home} | D ${o.draw} | A ${o.away}`);
  }
}

// Direct bet links
for (const [bookie, url] of Object.entries(odds.urls || {})) {
  console.log(`  Bet at ${bookie}: ${url}`);
}
```

### Quick Start (JavaScript)

```javascript theme={null}
const { OddsAPIClient } = require('odds-api-io');

const client = new OddsAPIClient({ apiKey: 'YOUR_API_KEY' });

const sports = await client.getSports();
console.log(`Found ${sports.length} sports`);
```

### Find Arbitrage Opportunities

```typescript theme={null}
const arbs = await client.getArbitrageBets({
  bookmakers: 'Bet365,SingBet',
  limit: 10,
  includeEventDetails: true,
});

arbs.forEach(arb => {
  console.log(`${arb.profitMargin.toFixed(2)}% profit`);
  arb.legs.forEach(leg => {
    console.log(`  ${leg.bookmaker} | ${leg.side} @ ${leg.odds}`);
  });
});
```

<Card title="View on GitHub" icon="github" href="https://github.com/odds-api-io/odds-api-node">
  Full documentation, examples, and API reference.
</Card>

***

## MCP Server (AI Tools)

Use Odds-API.io directly from AI coding tools like Claude, Cursor, and VS Code.

### Claude Code CLI

```bash theme={null}
claude mcp add odds-api --env ODDS_API_KEY="your-api-key" -- npx -y odds-api-mcp-server
```

### Claude Desktop

Add to your config (`~/.config/claude/claude_desktop_config.json`):

```json theme={null}
{
  "mcpServers": {
    "odds-api": {
      "command": "npx",
      "args": ["-y", "odds-api-mcp-server"],
      "env": {
        "ODDS_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Cursor

Add to your MCP settings:

```json theme={null}
{
  "odds-api": {
    "command": "npx",
    "args": ["-y", "odds-api-mcp-server"],
    "env": {
      "ODDS_API_KEY": "your-api-key"
    }
  }
}
```

Once configured, ask your AI assistant things like:

* *"Get me upcoming Premier League matches with odds"*
* *"Find value bets from Bet365"*
* *"Show arbitrage opportunities"*

<Card title="View on GitHub" icon="github" href="https://github.com/odds-api-io/odds-api-mcp-server">
  Installation guide and available tools.
</Card>

***

## Error Handling

All SDKs include custom error classes for clean error handling:

<CodeGroup>
  ```python Python theme={null}
  from odds_api import (
      OddsAPIClient,
      InvalidAPIKeyError,
      RateLimitExceededError,
      NotFoundError,
  )

  try:
      events = client.get_events(sport="basketball")
  except InvalidAPIKeyError:
      print("Invalid API key")
  except RateLimitExceededError:
      print("Rate limit exceeded - wait before retrying")
  except NotFoundError:
      print("Resource not found")
  ```

  ```typescript Node.js theme={null}
  import {
    OddsAPIClient,
    InvalidAPIKeyError,
    RateLimitExceededError,
    NotFoundError,
  } from 'odds-api-io';

  try {
    const events = await client.getEvents({ sport: 'basketball' });
  } catch (error) {
    if (error instanceof InvalidAPIKeyError) {
      console.error('Invalid API key');
    } else if (error instanceof RateLimitExceededError) {
      console.error('Rate limit exceeded');
    } else if (error instanceof NotFoundError) {
      console.error('Not found');
    }
  }
  ```
</CodeGroup>

***

## WebSocket + SDK

Combine REST SDKs with WebSocket for a complete solution. Pre-fetch all odds via REST, then switch to WebSocket for real-time updates:

```python theme={null}
from odds_api import OddsAPIClient
import websocket, json

# Step 1: Initial snapshot via REST SDK
client = OddsAPIClient(api_key="YOUR_API_KEY")
events = client.get_events(sport="football", league="england-premier-league")

odds_store = {}
for event in events:
    odds = client.get_event_odds(event_id=event['id'], bookmakers="Bet365,SingBet")
    odds_store[str(event['id'])] = odds.get('bookmakers', {})

print(f"Loaded {len(odds_store)} events via REST")

# Step 2: Connect to WebSocket for live updates
def on_message(ws, message):
    data = json.loads(message)
    if data['type'] == 'updated':
        odds_store[data['id']] = {data['bookie']: data['markets']}
        print(f"Updated: Event {data['id']} | {data['bookie']}")

ws = websocket.WebSocketApp(
    f"wss://api.odds-api.io/v3/ws?apiKey=YOUR_API_KEY&markets=ML,Spread,Totals&sport=football",
    on_message=on_message
)
ws.run_forever(ping_interval=30)
```

<Tip>
  See the full WebSocket + prefetch examples in the [Python SDK](https://github.com/odds-api-io/odds-api-python/blob/main/examples/websocket_feed.py) and [Node.js SDK](https://github.com/odds-api-io/odds-api-node/blob/main/examples/websocket-feed.ts) repos.
</Tip>

***

## All Repositories

| Repository                                                                | Type        | Install                   | Links                                                    |
| ------------------------------------------------------------------------- | ----------- | ------------------------- | -------------------------------------------------------- |
| [odds-api-python](https://github.com/odds-api-io/odds-api-python)         | Python SDK  | `pip install odds-api-io` | [PyPI](https://pypi.org/project/odds-api-io/)            |
| [odds-api-node](https://github.com/odds-api-io/odds-api-node)             | Node.js SDK | `npm install odds-api-io` | [npm](https://www.npmjs.com/package/odds-api-io)         |
| [odds-api-mcp-server](https://github.com/odds-api-io/odds-api-mcp-server) | MCP Server  | `npx odds-api-mcp-server` | [npm](https://www.npmjs.com/package/odds-api-mcp-server) |

<Note>
  **Need an SDK in another language?** Let us know at [hello@odds-api.io](mailto:hello@odds-api.io)
</Note>


> ## Documentation Index
> Fetch the complete documentation index at: https://docs.odds-api.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Best Practices

> Optimize your Odds-API.io integration with best practices for caching, batch requests, error handling, and rate limiting. Build efficient apps.

## Performance Optimization

### 1. Use Batch Endpoints

Always use the multi-odds endpoint when fetching odds for multiple events:

**Bad:**

```javascript theme={null}
// ❌ Makes 10 API requests
for (const eventId of eventIds) {
  const odds = await fetchOdds(eventId);
}
```

**Good:**

```javascript theme={null}
// ✅ Makes 1 API request
const eventIds = '123456,123457,123458'; // Up to 10 events
const odds = await fetchMultiOdds(eventIds);
```

### 2. Implement Caching

Cache responses based on data type and freshness requirements:

```javascript theme={null}
const cache = new Map();

function getCacheKey(endpoint, params) {
  return `${endpoint}:${JSON.stringify(params)}`;
}

async function cachedFetch(endpoint, params, ttl = 60000) {
  const key = getCacheKey(endpoint, params);
  const cached = cache.get(key);

  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }

  const data = await fetch(endpoint, params);
  cache.set(key, { data, timestamp: Date.now() });

  return data;
}

// Usage
const sports = await cachedFetch('/sports', {}, 3600000); // Cache for 1 hour
const events = await cachedFetch('/events', { sport: 'football' }, 300000); // 5 minutes
const odds = await cachedFetch('/odds', { eventId: 123 }, 30000); // 30 seconds
```

**Recommended Cache TTLs:**

| Data Type        | TTL           | Reason                  |
| ---------------- | ------------- | ----------------------- |
| Sports list      | 1 hour+       | Rarely changes          |
| Leagues list     | 1 hour        | Rarely changes          |
| Pre-match events | 5-10 minutes  | Updated periodically    |
| Pre-match odds   | 30-60 seconds | Changes frequently      |
| Live events      | 10-30 seconds | Changes very frequently |
| Live odds        | 5-10 seconds  | Changes in real-time    |

### 3. Select Bookmakers Wisely

Don't fetch odds from all 250+ bookmakers:

```javascript theme={null}
// ✅ Select relevant bookmakers for your region
const popularEUBookmakers = [
  'Bet365',
  'Unibet',
  'William Hill',
  'Betway',
  'Bwin'
];

const popularUSBookmakers = [
  'FanDuel',
  'DraftKings',
  'BetMGM',
  'Caesars'
];

// Fetch odds only from relevant bookmakers
const odds = await fetchOdds(eventId, popularEUBookmakers.join(','));
```

### 4. Filter Events by Bookmaker

When you only care about events available at specific bookmakers, use the `bookmaker` parameter on the events endpoint. This returns only events that have odds from that bookmaker:

```javascript theme={null}
// ✅ Only get events with Bet365 odds
const response = await fetch(
  `https://api.odds-api.io/v3/events?apiKey=${apiKey}&sport=football&bookmaker=Bet365`
);

const events = await response.json();
// All returned events are guaranteed to have Bet365 odds
```

<Tip>
  This is much more efficient than fetching all events and then filtering client-side. It reduces response size and ensures you only process relevant events.
</Tip>

## Rate Limit Management

### 1. Implement Rate Limiting

Track and respect API rate limits:

```javascript theme={null}
class RateLimiter {
  constructor(requestsPerMinute) {
    this.limit = requestsPerMinute;
    this.requests = [];
  }

  async waitForSlot() {
    const now = Date.now();
    const minute = 60 * 1000;

    // Remove requests older than 1 minute
    this.requests = this.requests.filter(time => now - time < minute);

    // Wait if at limit
    if (this.requests.length >= this.limit) {
      const oldestRequest = this.requests[0];
      const waitTime = minute - (now - oldestRequest);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.waitForSlot();
    }

    this.requests.push(now);
  }

  async execute(fn) {
    await this.waitForSlot();
    return fn();
  }
}

// Usage
const limiter = new RateLimiter(30); // 30 requests per minute

async function fetchOdds(eventId) {
  return limiter.execute(() =>
    fetch(`https://api.odds-api.io/v3/odds?apiKey=${apiKey}&eventId=${eventId}`)
  );
}
```

### 2. Handle 429 Responses

Implement exponential backoff for rate limit errors:

```javascript theme={null}
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, i) * 1000;

        console.log(`Rate limited. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}
```

### 3. Monitor Usage

Track your API usage to avoid hitting limits:

```javascript theme={null}
class UsageTracker {
  constructor() {
    this.requestCount = 0;
    this.startTime = Date.now();
  }

  recordRequest() {
    this.requestCount++;
  }

  getStats() {
    const elapsed = (Date.now() - this.startTime) / 1000 / 60; // minutes
    const requestsPerMinute = this.requestCount / elapsed;

    return {
      totalRequests: this.requestCount,
      elapsedMinutes: elapsed.toFixed(2),
      requestsPerMinute: requestsPerMinute.toFixed(2)
    };
  }

  reset() {
    this.requestCount = 0;
    this.startTime = Date.now();
  }
}

const tracker = new UsageTracker();

async function monitoredFetch(url) {
  tracker.recordRequest();
  const response = await fetch(url);

  // Log usage every 100 requests
  if (tracker.requestCount % 100 === 0) {
    console.log('Usage stats:', tracker.getStats());
  }

  return response.json();
}
```

## Error Handling

### 1. Graceful Degradation

Handle missing data gracefully:

```javascript theme={null}
function getBestOdds(oddsData, market = 'ML') {
  try {
    const bookmakerOdds = Object.entries(oddsData.bookmakers)
      .map(([bookmaker, markets]) => {
        const targetMarket = markets.find(m => m.name === market);
        if (!targetMarket?.odds?.[0]) return null;

        return {
          bookmaker,
          ...targetMarket.odds[0]
        };
      })
      .filter(Boolean);

    if (bookmakerOdds.length === 0) {
      return null; // No odds available
    }

    // Find best odds for each outcome
    return {
      home: bookmakerOdds.reduce((best, current) =>
        parseFloat(current.home || 0) > parseFloat(best.home || 0) ? current : best
      ),
      away: bookmakerOdds.reduce((best, current) =>
        parseFloat(current.away || 0) > parseFloat(best.away || 0) ? current : best
      )
    };
  } catch (error) {
    console.error('Error finding best odds:', error);
    return null;
  }
}
```

### 2. Validate Responses

Always validate API responses:

```javascript theme={null}
function validateOddsResponse(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid response format');
  }

  if (!data.id || !data.home || !data.away) {
    throw new Error('Missing required fields');
  }

  if (!data.bookmakers || typeof data.bookmakers !== 'object') {
    throw new Error('Invalid bookmakers data');
  }

  return true;
}

async function fetchOdds(eventId) {
  try {
    const response = await fetch(
      `https://api.odds-api.io/v3/odds?apiKey=${apiKey}&eventId=${eventId}&bookmakers=Bet365`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    validateOddsResponse(data);

    return data;
  } catch (error) {
    console.error('Failed to fetch odds:', error);
    throw error;
  }
}
```

### 3. Timeout Handling

Set timeouts for API requests:

```javascript theme={null}
async function fetchWithTimeout(url, timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}
```

## Security Best Practices

### 1. Secure API Keys

<Warning>
  **Never expose API keys in client-side code!**
</Warning>

```javascript theme={null}
// ❌ Bad - API key exposed in browser
const apiKey = 'sk_live_1234567890';
fetch(`https://api.odds-api.io/v3/odds?apiKey=${apiKey}`);

// ✅ Good - API key stays on server
// Frontend
fetch('/api/proxy/odds?eventId=123456');

// Backend
app.get('/api/proxy/odds', async (req, res) => {
  const apiKey = process.env.ODDS_API_KEY;
  const response = await fetch(
    `https://api.odds-api.io/v3/odds?apiKey=${apiKey}&eventId=${req.query.eventId}`
  );
  const data = await response.json();
  res.json(data);
});
```

### 2. Validate Input

Always validate user input before using it in API calls:

```javascript theme={null}
function validateEventId(eventId) {
  const id = parseInt(eventId);
  if (isNaN(id) || id <= 0) {
    throw new Error('Invalid event ID');
  }
  return id;
}

function validateBookmakers(bookmakers) {
  const validBookmakers = bookmakers.split(',')
    .map(b => b.trim())
    .filter(b => b.length > 0);

  if (validBookmakers.length === 0 || validBookmakers.length > 30) {
    throw new Error('Invalid bookmakers list (1-30 required)');
  }

  return validBookmakers.join(',');
}

// Usage
app.get('/api/odds', async (req, res) => {
  try {
    const eventId = validateEventId(req.query.eventId);
    const bookmakers = validateBookmakers(req.query.bookmakers);

    const data = await fetchOdds(eventId, bookmakers);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

## Data Management

### 1. Database Schema

Store odds data efficiently:

```sql theme={null}
-- Events table
CREATE TABLE events (
  id INTEGER PRIMARY KEY,
  sport VARCHAR(50),
  league VARCHAR(100),
  home_team VARCHAR(100),
  away_team VARCHAR(100),
  event_date TIMESTAMP,
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Odds table (time-series data)
CREATE TABLE odds (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(id),
  bookmaker VARCHAR(50),
  market VARCHAR(50),
  home_odds DECIMAL(10, 2),
  draw_odds DECIMAL(10, 2),
  away_odds DECIMAL(10, 2),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_event_time (event_id, timestamp)
);

-- Optimize for time-series queries
CREATE INDEX idx_odds_timestamp ON odds(timestamp DESC);
CREATE INDEX idx_odds_event_bookmaker ON odds(event_id, bookmaker, market);
```

### 2. Store Historical Data

Keep historical odds for analysis:

```javascript theme={null}
async function storeOdds(eventId, oddsData) {
  const timestamp = new Date();

  for (const [bookmaker, markets] of Object.entries(oddsData.bookmakers)) {
    for (const market of markets) {
      if (!market.odds[0]) continue;

      await db.query(
        `INSERT INTO odds (event_id, bookmaker, market, home_odds, draw_odds, away_odds, timestamp)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          eventId,
          bookmaker,
          market.name,
          market.odds[0].home,
          market.odds[0].draw,
          market.odds[0].away,
          timestamp
        ]
      );
    }
  }
}
```

### 3. Cleanup Old Data

Regularly clean up stale data:

```javascript theme={null}
// Delete odds older than 90 days
async function cleanupOldOdds() {
  await db.query(
    `DELETE FROM odds WHERE timestamp < NOW() - INTERVAL '90 days'`
  );
}

// Run daily cleanup
setInterval(cleanupOldOdds, 24 * 60 * 60 * 1000);
```

## Monitoring & Logging

### 1. Log Important Events

```javascript theme={null}
class APILogger {
  log(level, message, meta = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...meta
    };

    console.log(JSON.stringify(entry));

    // Send to logging service (e.g., Winston, Pino, CloudWatch)
  }

  info(message, meta) {
    this.log('info', message, meta);
  }

  error(message, error, meta) {
    this.log('error', message, {
      ...meta,
      error: error.message,
      stack: error.stack
    });
  }

  metric(name, value, unit = 'count') {
    this.log('metric', name, { value, unit });
  }
}

const logger = new APILogger();

// Usage
async function fetchOdds(eventId) {
  const startTime = Date.now();

  try {
    logger.info('Fetching odds', { eventId });

    const data = await fetch(`...`);

    const duration = Date.now() - startTime;
    logger.metric('odds_fetch_duration', duration, 'ms');

    return data;
  } catch (error) {
    logger.error('Failed to fetch odds', error, { eventId });
    throw error;
  }
}
```

### 2. Set Up Alerts

Monitor critical metrics:

```javascript theme={null}
class AlertSystem {
  constructor(thresholds) {
    this.thresholds = thresholds;
    this.metrics = {};
  }

  recordMetric(name, value) {
    if (!this.metrics[name]) {
      this.metrics[name] = [];
    }

    this.metrics[name].push({
      value,
      timestamp: Date.now()
    });

    // Keep only last 100 values
    if (this.metrics[name].length > 100) {
      this.metrics[name].shift();
    }

    this.checkThreshold(name);
  }

  checkThreshold(name) {
    const threshold = this.thresholds[name];
    if (!threshold) return;

    const recent = this.metrics[name].slice(-10);
    const average = recent.reduce((sum, m) => sum + m.value, 0) / recent.length;

    if (average > threshold) {
      this.sendAlert(name, average, threshold);
    }
  }

  sendAlert(metric, value, threshold) {
    console.error(`ALERT: ${metric} is ${value}, threshold: ${threshold}`);
    // Send to alerting service (PagerDuty, Slack, etc.)
  }
}

const alerts = new AlertSystem({
  error_rate: 0.05, // 5% error rate
  response_time: 2000, // 2 second response time
  rate_limit_hits: 5 // 5 rate limit hits in 10 requests
});
```

## Testing

### 1. Unit Tests

```javascript theme={null}
const { describe, it, expect } = require('@jest/globals');

describe('Odds API Client', () => {
  it('should fetch odds for an event', async () => {
    const eventId = 123456;
    const odds = await fetchOdds(eventId);

    expect(odds).toBeDefined();
    expect(odds.id).toBe(eventId);
    expect(odds.bookmakers).toBeDefined();
  });

  it('should handle invalid event ID', async () => {
    await expect(fetchOdds('invalid')).rejects.toThrow();
  });

  it('should cache responses', async () => {
    const eventId = 123456;

    const start1 = Date.now();
    await getCachedOdds(eventId);
    const time1 = Date.now() - start1;

    const start2 = Date.now();
    await getCachedOdds(eventId);
    const time2 = Date.now() - start2;

    expect(time2).toBeLessThan(time1);
  });
});
```

### 2. Integration Tests

```javascript theme={null}
describe('Odds API Integration', () => {
  it('should fetch and compare odds', async () => {
    // Fetch events
    const events = await fetchEvents('football');
    expect(events.length).toBeGreaterThan(0);

    // Fetch odds for first event
    const odds = await fetchOdds(events[0].id);
    expect(odds.bookmakers).toBeDefined();

    // Find best odds
    const bestOdds = findBestOdds(odds);
    expect(bestOdds.home).toBeDefined();
    expect(bestOdds.away).toBeDefined();
  });
});
```

## Summary Checklist

<AccordionGroup>
  <Accordion title="Performance">
    * ✅ Use batch endpoints when possible
    * ✅ Implement appropriate caching
    * ✅ Select relevant bookmakers only
    * ✅ Minimize unnecessary API calls
  </Accordion>

  <Accordion title="Rate Limiting">
    * ✅ Implement rate limiting logic
    * ✅ Handle 429 responses with backoff
    * ✅ Monitor and track usage
    * ✅ Use multi-endpoints efficiently
  </Accordion>

  <Accordion title="Error Handling">
    * ✅ Validate all responses
    * ✅ Handle missing data gracefully
    * ✅ Implement request timeouts
    * ✅ Log errors properly
  </Accordion>

  <Accordion title="Security">
    * ✅ Never expose API keys client-side
    * ✅ Use environment variables
    * ✅ Validate all user input
    * ✅ Implement server-side proxy
  </Accordion>

  <Accordion title="Data Management">
    * ✅ Design efficient database schema
    * ✅ Store historical data when needed
    * ✅ Clean up old data regularly
    * ✅ Index time-series queries
  </Accordion>
</AccordionGroup>


> ## Documentation Index
> Fetch the complete documentation index at: https://docs.odds-api.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Finding Value Bets

> Use the Odds-API.io Value Bets endpoint to find profitable betting opportunities. Get pre-calculated EV from 250+ bookmakers, updated every 5 seconds.

# Find Profitable Bets Instantly with the Value Bets API

If you're serious about sports betting, you know how powerful real-time data can be. Whether you're a developer, sports trader, or running a betting platform, fast and reliable odds comparison can give you a major advantage.

With our **Value Bets API**, you get access to real-time odds from over 250 bookmakers, including industry leaders like **Bet365** and **SingBet**. This guide will walk you through how to use our API to uncover profitable bets.

## What Is a Value Bet?

A **value bet** is when a sportsbook offers odds that are too high based on the actual probability of the outcome. These bets have **positive expected value (EV)**, which means they offer long-term profitability when used correctly.

Spotting these bets manually is difficult and time-consuming. Our Value Bets API does the work for you by analyzing live odds and identifying high-EV bets instantly.

## How the Value Bets API Works

Our system scans live odds across more than **250 trusted bookmakers** worldwide. It calculates the expected value for each bet and filters out anything that doesn't offer a clear statistical edge.

You'll only receive bets that have strong upside potential based on the latest odds data.

## Real-Time API Example

With a simple API call, you can retrieve profitable value bets from any bookmaker. For example, to get value bets from Bet365:

```bash theme={null}
https://api.odds-api.io/v3/value-bets?apiKey=YOUR_API_KEY&bookmaker=Bet365&includeEventDetails=true
```

This will return live value bets from Bet365, complete with event info, odds, market type, and EV percentage.

<CodeGroup>
  ```bash cURL theme={null}
  curl "https://api.odds-api.io/v3/value-bets?apiKey=YOUR_API_KEY&bookmaker=Bet365&includeEventDetails=true"
  ```

  ```javascript JavaScript theme={null}
  const apiKey = process.env.ODDS_API_KEY;

  const response = await fetch(
    `https://api.odds-api.io/v3/value-bets?apiKey=${apiKey}&bookmaker=Bet365&includeEventDetails=true`
  );

  const valueBets = await response.json();
  console.log(valueBets);
  ```

  ```python Python theme={null}
  import requests
  import os

  api_key = os.environ['ODDS_API_KEY']

  response = requests.get(
      'https://api.odds-api.io/v3/value-bets',
      params={
          'apiKey': api_key,
          'bookmaker': 'Bet365',
          'includeEventDetails': True
      }
  )

  value_bets = response.json()
  print(value_bets)
  ```

  ```php PHP theme={null}
  <?php
  $apiKey = getenv('ODDS_API_KEY');

  $url = 'https://api.odds-api.io/v3/value-bets?' . http_build_query([
      'apiKey' => $apiKey,
      'bookmaker' => 'Bet365',
      'includeEventDetails' => true
  ]);

  $response = file_get_contents($url);
  $valueBets = json_decode($response, true);
  print_r($valueBets);
  ```
</CodeGroup>

## Example Response

Let's say the API returns a bet on the away team, **Manisa Futbol Kulubu**, with an expected value of **110.73%**. That means this bet is priced better than it should be, giving you a statistical edge.

```json theme={null}
{
  "id": "63628875-Spread-away-Bet365--1",
  "expectedValue": 110.73,
  "expectedValueUpdatedAt": "2025-09-16T11:33:06.615Z",
  "betSide": "away",
  "market": {
    "name": "Spread",
    "hdp": -1,
    "home": "2.491",
    "away": "1.671",
    "max": 150
  },
  "bookmaker": "Bet365",
  "bookmakerOdds": {
    "home": "1.950",
    "away": "1.850",
    "hdp": "-1",
    "href": "https://www.bet365.com/#/AC/B1/C1/D8/E181348466/F3/"
  },
  "eventId": 63628875,
  "event": {
    "home": "Kirikkale FK",
    "away": "Manisa Futbol Kulubu",
    "date": "2025-09-16T12:30:00Z",
    "sport": "Football",
    "league": "Turkiye - Turkiye Kupasi"
  }
}
```

## Understanding the Response

| Field           | Description                       | Example                                    |
| --------------- | --------------------------------- | ------------------------------------------ |
| `expectedValue` | The calculated EV as a percentage | 110.73% means the bet offers 110.73% value |
| `betSide`       | Which outcome has value           | "away", "home", "over", "under"            |
| `market.name`   | The betting market                | "Spread", "ML", "Over/Under"               |
| `bookmakerOdds` | Current odds at the bookmaker     | Bet365 offers 1.850 for away               |
| `event`         | Match details                     | Teams, date, sport, league                 |

<Note>
  An expected value of **110.73%** means if you repeatedly place similar bets, you can expect a return of 110.73% over the long run. That's a significant edge.
</Note>

## Filtering High-Value Bets

Here's how to filter and sort value bets to find the most profitable opportunities:

```javascript theme={null}
// Filter bets with at least 5% expected value
const highValueBets = valueBets
  .filter(bet => bet.expectedValue >= 5)
  .sort((a, b) => b.expectedValue - a.expectedValue);

// Display the top 5 value bets
highValueBets.slice(0, 5).forEach((bet, index) => {
  console.log(`\n#${index + 1} Value Bet:`);
  console.log(`Match: ${bet.event.home} vs ${bet.event.away}`);
  console.log(`League: ${bet.event.league}`);
  console.log(`Market: ${bet.market.name}`);
  console.log(`Bet on: ${bet.betSide}`);
  console.log(`Odds: ${bet.bookmakerOdds[bet.betSide]}`);
  console.log(`Expected Value: ${bet.expectedValue.toFixed(2)}%`);
  console.log(`Bookmaker: ${bet.bookmaker}`);
  console.log(`Place bet: ${bet.bookmakerOdds.href}`);
});
```

**Output:**

```
#1 Value Bet:
Match: Kirikkale FK vs Manisa Futbol Kulubu
League: Turkiye - Turkiye Kupasi
Market: Spread
Bet on: away
Odds: 1.850
Expected Value: 110.73%
Bookmaker: Bet365
Place bet: https://www.bet365.com/#/AC/B1/C1/D8/E181348466/F3/
```

## Monitoring Multiple Bookmakers

To maximize opportunities, monitor value bets across multiple bookmakers:

```javascript theme={null}
const bookmakers = ['Bet365', 'SingBet', 'Unibet', 'William Hill', 'DraftKings'];

async function getAllValueBets() {
  const apiKey = process.env.ODDS_API_KEY;

  const promises = bookmakers.map(bookmaker =>
    fetch(
      `https://api.odds-api.io/v3/value-bets?apiKey=${apiKey}&bookmaker=${bookmaker}&includeEventDetails=true`
    ).then(res => res.json())
  );

  const results = await Promise.all(promises);

  // Combine all value bets
  const allBets = results.flat();

  // Filter for minimum 5% EV and sort by EV
  const topBets = allBets
    .filter(bet => bet.expectedValue >= 5)
    .sort((a, b) => b.expectedValue - a.expectedValue);

  return topBets;
}

const valueBets = await getAllValueBets();
console.log(`Found ${valueBets.length} value bets across all bookmakers`);
```

## Real-World Use Case: Automated Alerts

Build an automated system that alerts you when high-value bets appear:

```javascript theme={null}
class ValueBetMonitor {
  constructor(apiKey, minEV = 5) {
    this.apiKey = apiKey;
    this.minEV = minEV;
    this.bookmakers = ['Bet365', 'SingBet', 'Unibet'];
    this.notifiedBets = new Set();
  }

  async checkForValueBets() {
    for (const bookmaker of this.bookmakers) {
      try {
        const response = await fetch(
          `https://api.odds-api.io/v3/value-bets?apiKey=${this.apiKey}&bookmaker=${bookmaker}&includeEventDetails=true`
        );

        const bets = await response.json();

        bets
          .filter(bet => bet.expectedValue >= this.minEV)
          .filter(bet => !this.notifiedBets.has(bet.id))
          .forEach(bet => {
            this.sendAlert(bet);
            this.notifiedBets.add(bet.id);
          });
      } catch (error) {
        console.error(`Error checking ${bookmaker}:`, error);
      }
    }
  }

  sendAlert(bet) {
    const message = `
🎯 Value Bet Alert!

${bet.event.home} vs ${bet.event.away}
${bet.event.league} | ${bet.event.sport}

Market: ${bet.market.name}
Bet on: ${bet.betSide.toUpperCase()}
Odds: ${bet.bookmakerOdds[bet.betSide]}
Expected Value: ${bet.expectedValue.toFixed(2)}%

Bookmaker: ${bet.bookmaker}
Place bet: ${bet.bookmakerOdds.href}
    `.trim();

    console.log(message);
    // Send via email, SMS, Telegram, etc.
  }

  start(intervalSeconds = 30) {
    console.log('Starting value bet monitor...');
    this.checkForValueBets(); // Initial check
    setInterval(() => this.checkForValueBets(), intervalSeconds * 1000);
  }
}

// Usage
const monitor = new ValueBetMonitor(process.env.ODDS_API_KEY, 5);
monitor.start(30); // Check every 30 seconds
```

## Why Use Odds-API.io for Value Betting?

Here's what sets us apart:

<CardGroup cols={2}>
  <Card title="Real-Time Data" icon="bolt">
    Odds updated with sub-150ms latency
  </Card>

  <Card title="250+ Bookmakers" icon="building">
    Including Bet365, SingBet, William Hill, DraftKings, and more
  </Card>

  <Card title="20+ Sports" icon="futbol">
    Football, basketball, tennis, esports, and more
  </Card>

  <Card title="100+ Market Types" icon="chart-mixed">
    ML, spreads, totals, props, and specialized markets
  </Card>

  <Card title="99.9% Uptime" icon="check-circle">
    Backed by SLA for reliability
  </Card>

  <Card title="Developer-First" icon="code">
    Clean JSON responses with full documentation
  </Card>
</CardGroup>

## Get Started Free

Start with our **free tier**, no credit card needed. Test the full API including value bets.

Need higher limits or additional features? Reach out for custom enterprise solutions with dedicated infrastructure and 24/7 support.

<Card title="Get Started Free" icon="rocket" href="https://odds-api.io">
  Get started with Odds-API.io today
</Card>

## Frequently Asked Questions

<AccordionGroup>
  <Accordion title="What sports are included?">
    We cover football, basketball, tennis, baseball, esports, and more. Over 20 sports in total.
  </Accordion>

  <Accordion title="Can I filter value bets?">
    Yes, you can filter by bookmaker, sport, and market type. You can also set your own minimum expected value threshold.
  </Accordion>

  <Accordion title="How fast is the data?">
    Odds are updated in real time, with average latency under 150 milliseconds. Value bets are recalculated every 5 seconds.
  </Accordion>

  <Accordion title="How is expected value calculated?">
    We analyze odds from all available bookmakers to calculate the true market probability, then compare each bookmaker's odds to identify value opportunities.
  </Accordion>

  <Accordion title="What bookmakers are supported?">
    Over 250 bookmakers worldwide, including Bet365, SingBet, Unibet, William Hill, DraftKings, FanDuel, and many more.
  </Accordion>
</AccordionGroup>

## Next Steps

<CardGroup cols={2}>
  <Card title="API Reference" icon="code" href="/api-reference/introduction">
    Explore the full Value Bets API documentation
  </Card>

  <Card title="Value Bets Guide" icon="book" href="/guides/value-bets">
    Learn advanced value betting strategies
  </Card>

  <Card title="Best Practices" icon="lightbulb" href="/guides/best-practices">
    Optimize your API usage and implementation
  </Card>

  <Card title="Quickstart" icon="rocket" href="/quickstart">
    Get started with your first API call
  </Card>
</CardGroup>


> ## Documentation Index
> Fetch the complete documentation index at: https://docs.odds-api.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Comparing Odds Across Bookmakers

> Build a betting odds comparison tool with Odds-API.io. Compare prices from 250+ bookmakers in real-time and find the best odds for any event.

# Build an Odds Comparison Tool

One of the most powerful use cases for the Odds-API.io is building odds comparison platforms. By comparing odds across 250+ bookmakers, you can help bettors find the best prices and maximize their potential returns.

## Why Compare Odds?

Different bookmakers offer different odds for the same event. Even small differences can significantly impact long-term profitability:

* **Bet365** offers 2.10 for Manchester United to win
* **SingBet** offers 2.15 for the same outcome
* **Unibet** offers 2.08

By consistently betting at the best odds, a bettor can increase their returns by **5-10% over time**.

## Example: Premier League Match

Let's compare odds for a Premier League match between Manchester United and Liverpool.

### Step 1: Fetch Events

First, get upcoming Premier League matches:

```javascript theme={null}
const apiKey = process.env.ODDS_API_KEY;

const response = await fetch(
  `https://api.odds-api.io/v3/events?apiKey=${apiKey}&sport=football&league=england-premier-league&status=pending&limit=10`
);

const events = await response.json();
console.log(events);
```

**Response:**

```json theme={null}
[
  {
    "id": 123456,
    "sport": {
      "name": "Football",
      "slug": "football"
    },
    "league": {
      "name": "Premier League",
      "slug": "england-premier-league"
    },
    "home": "Manchester United",
    "away": "Liverpool",
    "date": "2025-10-15T15:00:00Z",
    "status": "pending"
  }
]
```

### Step 2: Fetch Odds from Multiple Bookmakers

Now get odds from popular bookmakers:

```javascript theme={null}
const eventId = 123456;
const bookmakers = 'Bet365,SingBet,Unibet,William Hill,Betway';

const oddsResponse = await fetch(
  `https://api.odds-api.io/v3/odds?apiKey=${apiKey}&eventId=${eventId}&bookmakers=${bookmakers}`
);

const oddsData = await oddsResponse.json();
```

**Response:**

```json theme={null}
{
  "id": 123456,
  "home": "Manchester United",
  "away": "Liverpool",
  "date": "2025-10-15T15:00:00Z",
  "status": "pending",
  "sport": {
    "name": "Football",
    "slug": "football"
  },
  "league": {
    "name": "Premier League",
    "slug": "england-premier-league"
  },
  "bookmakers": {
    "Bet365": [
      {
        "name": "ML",
        "odds": [
          {
            "home": "2.10",
            "draw": "3.40",
            "away": "3.20"
          }
        ],
        "updatedAt": "2025-10-04T10:30:00Z"
      }
    ],
    "SingBet": [
      {
        "name": "ML",
        "odds": [
          {
            "home": "2.15",
            "draw": "3.35",
            "away": "3.15"
          }
        ],
        "updatedAt": "2025-10-04T10:29:50Z"
      }
    ],
    "Unibet": [
      {
        "name": "ML",
        "odds": [
          {
            "home": "2.08",
            "draw": "3.45",
            "away": "3.25"
          }
        ],
        "updatedAt": "2025-10-04T10:30:15Z"
      }
    ]
  }
}
```

### Step 3: Find the Best Odds

Create a function to find the best odds for each outcome:

```javascript theme={null}
function findBestOdds(oddsData, market = 'ML') {
  const bestOdds = {
    home: { bookmaker: null, odds: 0, link: null },
    draw: { bookmaker: null, odds: 0, link: null },
    away: { bookmaker: null, odds: 0, link: null }
  };

  for (const [bookmaker, markets] of Object.entries(oddsData.bookmakers)) {
    const targetMarket = markets.find(m => m.name === market);
    if (!targetMarket?.odds[0]) continue;

    const odds = targetMarket.odds[0];

    // Check home odds
    if (parseFloat(odds.home) > bestOdds.home.odds) {
      bestOdds.home = {
        bookmaker,
        odds: parseFloat(odds.home)
      };
    }

    // Check draw odds
    if (odds.draw && parseFloat(odds.draw) > bestOdds.draw.odds) {
      bestOdds.draw = {
        bookmaker,
        odds: parseFloat(odds.draw)
      };
    }

    // Check away odds
    if (parseFloat(odds.away) > bestOdds.away.odds) {
      bestOdds.away = {
        bookmaker,
        odds: parseFloat(odds.away)
      };
    }
  }

  return bestOdds;
}

// Usage
const bestOdds = findBestOdds(oddsData);

console.log('\nBest Odds for Manchester United vs Liverpool:\n');
console.log(`Home (${oddsData.home}): ${bestOdds.home.odds} at ${bestOdds.home.bookmaker}`);
console.log(`Draw: ${bestOdds.draw.odds} at ${bestOdds.draw.bookmaker}`);
console.log(`Away (${oddsData.away}): ${bestOdds.away.odds} at ${bestOdds.away.bookmaker}`);
```

**Output:**

```
Best Odds for Manchester United vs Liverpool:

Home (Manchester United): 2.15 at SingBet
Draw: 3.45 at Unibet
Away (Liverpool): 3.25 at Unibet
```

## Building a Complete Comparison Table

Here's how to display a full odds comparison table:

```javascript theme={null}
function createComparisonTable(oddsData, market = 'ML') {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`${oddsData.home} vs ${oddsData.away}`);
  console.log(`${oddsData.league.name} | ${new Date(oddsData.date).toLocaleString()}`);
  console.log(`${'='.repeat(80)}\n`);

  console.log('Bookmaker'.padEnd(20) + 'Home'.padEnd(15) + 'Draw'.padEnd(15) + 'Away'.padEnd(15) + 'Updated');
  console.log('-'.repeat(80));

  const bookmakerOdds = [];

  for (const [bookmaker, markets] of Object.entries(oddsData.bookmakers)) {
    const targetMarket = markets.find(m => m.name === market);
    if (!targetMarket?.odds[0]) continue;

    const odds = targetMarket.odds[0];
    bookmakerOdds.push({
      bookmaker,
      home: odds.home || '-',
      draw: odds.draw || '-',
      away: odds.away || '-',
      updated: new Date(targetMarket.updatedAt).toLocaleTimeString()
    });
  }

  // Sort by home odds (highest first)
  bookmakerOdds.sort((a, b) => parseFloat(b.home) - parseFloat(a.home));

  bookmakerOdds.forEach(row => {
    console.log(
      row.bookmaker.padEnd(20) +
      row.home.padEnd(15) +
      row.draw.padEnd(15) +
      row.away.padEnd(15) +
      row.updated
    );
  });

  console.log('-'.repeat(80));

  // Show best odds for each outcome
  const best = findBestOdds(oddsData, market);
  console.log('\nBest Odds:');
  console.log(`  Home: ${best.home.odds} (${best.home.bookmaker})`);
  console.log(`  Draw: ${best.draw.odds} (${best.draw.bookmaker})`);
  console.log(`  Away: ${best.away.odds} (${best.away.bookmaker})`);
}

createComparisonTable(oddsData);
```

**Output:**

```
================================================================================
Manchester United vs Liverpool
Premier League | 10/15/2025, 3:00:00 PM
================================================================================

Bookmaker           Home           Draw           Away           Updated
--------------------------------------------------------------------------------
SingBet            2.15           3.35           3.15           10:29:50 AM
Bet365              2.10           3.40           3.20           10:30:00 AM
Unibet              2.08           3.45           3.25           10:30:15 AM
William Hill        2.05           3.40           3.30           10:29:45 AM
Betway              2.12           3.38           3.18           10:30:10 AM
--------------------------------------------------------------------------------

Best Odds:
  Home: 2.15 (SingBet)
  Draw: 3.45 (Unibet)
  Away: 3.30 (William Hill)
```

## Calculating Potential Returns

Show users how much more they can win by choosing the best odds:

```javascript theme={null}
function calculateReturns(stake, odds) {
  const returns = stake * odds;
  const profit = returns - stake;

  return {
    returns: returns.toFixed(2),
    profit: profit.toFixed(2)
  };
}

function compareReturns(stake, bestOdds, averageOdds) {
  const best = calculateReturns(stake, bestOdds);
  const average = calculateReturns(stake, averageOdds);

  const extraProfit = (best.profit - average.profit).toFixed(2);
  const percentageGain = ((extraProfit / average.profit) * 100).toFixed(1);

  console.log(`\nBetting $${stake} on Manchester United to win:\n`);
  console.log(`Best odds (${bestOdds}):      $${best.returns} return, $${best.profit} profit`);
  console.log(`Average odds (${averageOdds}): $${average.returns} return, $${average.profit} profit`);
  console.log(`\nExtra profit: $${extraProfit} (+${percentageGain}%)`);
}

// Example: $100 bet
compareReturns(100, 2.15, 2.10);
```

**Output:**

```
Betting $100 on Manchester United to win:

Best odds (2.15):      $215.00 return, $115.00 profit
Average odds (2.10):   $210.00 return, $110.00 profit

Extra profit: $5.00 (+4.5%)
```

## Monitoring Multiple Events

Compare odds for all upcoming matches in a league:

```javascript theme={null}
async function compareLeagueOdds(sport, league) {
  const apiKey = process.env.ODDS_API_KEY;

  // Get all pending events
  const eventsRes = await fetch(
    `https://api.odds-api.io/v3/events?apiKey=${apiKey}&sport=${sport}&league=${league}&status=pending&limit=20`
  );
  const events = await eventsRes.json();

  console.log(`\nFound ${events.length} upcoming matches in ${league}\n`);

  // Get odds for up to 10 events at once using multi-odds endpoint
  const eventIds = events.slice(0, 10).map(e => e.id).join(',');
  const bookmakers = 'Bet365,SingBet,Unibet,William Hill,Betway';

  const oddsRes = await fetch(
    `https://api.odds-api.io/v3/odds/multi?apiKey=${apiKey}&eventIds=${eventIds}&bookmakers=${bookmakers}`
  );
  const allOdds = await oddsRes.json();

  // Display comparison for each match
  allOdds.forEach(oddsData => {
    const best = findBestOdds(oddsData);

    console.log(`${oddsData.home} vs ${oddsData.away}`);
    console.log(`  Best Home: ${best.home.odds} (${best.home.bookmaker})`);
    console.log(`  Best Draw: ${best.draw.odds} (${best.draw.bookmaker})`);
    console.log(`  Best Away: ${best.away.odds} (${best.away.bookmaker})`);
    console.log('');
  });
}

// Compare all Premier League matches
compareLeagueOdds('football', 'england-premier-league');
```

## Building a Web Interface

Create a simple odds comparison dashboard:

```javascript theme={null}
// Express.js example
const express = require('express');
const app = express();

app.get('/api/compare/:eventId', async (req, res) => {
  const apiKey = process.env.ODDS_API_KEY;
  const { eventId } = req.params;
  const bookmakers = 'Bet365,SingBet,Unibet,William Hill,Betway,DraftKings,FanDuel';

  try {
    const response = await fetch(
      `https://api.odds-api.io/v3/odds?apiKey=${apiKey}&eventId=${eventId}&bookmakers=${bookmakers}`
    );

    const oddsData = await response.json();
    const bestOdds = findBestOdds(oddsData);

    res.json({
      event: {
        id: oddsData.id,
        home: oddsData.home,
        away: oddsData.away,
        date: oddsData.date,
        league: oddsData.league.name
      },
      bestOdds,
      allBookmakers: Object.entries(oddsData.bookmakers).map(([name, markets]) => ({
        name,
        odds: markets.find(m => m.name === 'ML')?.odds[0] || null,
        updatedAt: markets.find(m => m.name === 'ML')?.updatedAt
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Odds comparison API running on port 3000');
});
```

## React Component Example

```jsx theme={null}
import { useState, useEffect } from 'react';

function OddsComparison({ eventId }) {
  const [odds, setOdds] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/compare/${eventId}`)
      .then(res => res.json())
      .then(data => {
        setOdds(data);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) return <div>Loading odds...</div>;

  return (
    <div className="odds-comparison">
      <h2>{odds.event.home} vs {odds.event.away}</h2>
      <p>{odds.event.league}</p>

      <div className="best-odds">
        <h3>Best Odds</h3>
        <div className="outcome">
          <span>Home: {odds.bestOdds.home.odds}</span>
          <small>{odds.bestOdds.home.bookmaker}</small>
        </div>
        <div className="outcome">
          <span>Draw: {odds.bestOdds.draw.odds}</span>
          <small>{odds.bestOdds.draw.bookmaker}</small>
        </div>
        <div className="outcome">
          <span>Away: {odds.bestOdds.away.odds}</span>
          <small>{odds.bestOdds.away.bookmaker}</small>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Bookmaker</th>
            <th>Home</th>
            <th>Draw</th>
            <th>Away</th>
          </tr>
        </thead>
        <tbody>
          {odds.allBookmakers.map(bookmaker => (
            <tr key={bookmaker.name}>
              <td>{bookmaker.name}</td>
              <td>{bookmaker.odds?.home || '-'}</td>
              <td>{bookmaker.odds?.draw || '-'}</td>
              <td>{bookmaker.odds?.away || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Key Takeaways

<CardGroup cols={2}>
  <Card title="Always Compare" icon="balance-scale">
    Different bookmakers offer different odds for the same event. Always compare before betting
  </Card>

  <Card title="Maximize Returns" icon="chart-line">
    Consistently betting at the best odds can increase returns by 5-10% over time
  </Card>

  <Card title="Use Multi-Odds" icon="layer-group">
    Fetch odds for up to 10 events in a single API call to save on requests
  </Card>

  <Card title="Update Frequently" icon="rotate">
    Odds change fast. Update your comparisons every 30-60 seconds for pre-match
  </Card>
</CardGroup>

## Next Steps

<CardGroup cols={2}>
  <Card title="Finding Value Bets" icon="magnifying-glass-dollar" href="/examples/finding-value-bets">
    Learn how to identify profitable betting opportunities
  </Card>

  <Card title="Fetching Odds Guide" icon="book" href="/guides/fetching-odds">
    Deep dive into the Odds API endpoints
  </Card>

  <Card title="Best Practices" icon="lightbulb" href="/guides/best-practices">
    Optimize your implementation
  </Card>

  <Card title="API Reference" icon="code" href="/api-reference/introduction">
    Explore the full Odds API documentation
  </Card>
</CardGroup>


> ## Documentation Index
> Fetch the complete documentation index at: https://docs.odds-api.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Player Props API

> Access real-time player prop odds from 250+ bookmakers including DraftKings and FanDuel. Get points, assists, passing yards for NBA, NFL, MLB, NHL.

# Get Player Prop Odds in Real Time

Player props are one of the fastest-growing betting markets. From LeBron James' points to Patrick Mahomes' passing yards, player props create unique betting experiences that appeal to both fantasy players and casual fans.

Odds-API.io covers player props with real-time updates from 250+ bookmakers, including US books like DraftKings and FanDuel.

## Why Player Props Matter

<CardGroup cols={2}>
  <Card title="Market Growth" icon="chart-line">
    Props account for a rising percentage of total betting handle, especially in the US
  </Card>

  <Card title="User Engagement" icon="users">
    Casual fans often prefer player-focused bets over team outcomes
  </Card>

  <Card title="Fantasy Crossover" icon="star">
    Many fantasy platforms are blending with prop betting year-round
  </Card>

  <Card title="App Differentiation" icon="trophy">
    Offering props helps apps stand out and capture larger audiences
  </Card>
</CardGroup>

## Available Props Coverage

* **NBA**: Points, rebounds, assists, three-pointers, double-doubles, and more
* **NFL**: Passing yards, rushing yards, touchdowns, receptions, completions, and more
* **MLB**: Strikeouts, home runs, total bases, hits, RBIs, and more
* **NHL**: Goals, shots on goal, saves, assists, points, and more
* **NCAAF**: Same as NFL props
* **And more**: Soccer, tennis, esports player props

## Fetching Player Props

Player props are available through the same `/v3/odds` endpoint:

<CodeGroup>
  ```bash cURL theme={null}
  curl "https://api.odds-api.io/v3/odds?apiKey=YOUR_API_KEY&eventId=123456&bookmakers=DraftKings,FanDuel"
  ```

  ```javascript JavaScript theme={null}
  const apiKey = process.env.ODDS_API_KEY;
  const eventId = 123456;
  const bookmakers = 'DraftKings,FanDuel';

  const response = await fetch(
    `https://api.odds-api.io/v3/odds?apiKey=${apiKey}&eventId=${eventId}&bookmakers=${bookmakers}`
  );

  const data = await response.json();

  // Find player props markets
  const props = [];
  Object.entries(data.bookmakers).forEach(([bookmaker, markets]) => {
    markets.forEach(market => {
      if (market.name.includes('Props') || market.label) {
        props.push({ bookmaker, market });
      }
    });
  });

  console.log(`Found ${props.length} player prop markets`);
  ```

  ```python Python theme={null}
  import requests
  import os

  api_key = os.environ['ODDS_API_KEY']
  event_id = 123456
  bookmakers = 'DraftKings,FanDuel'

  response = requests.get(
      'https://api.odds-api.io/v3/odds',
      params={
          'apiKey': api_key,
          'eventId': event_id,
          'bookmakers': bookmakers
      }
  )

  data = response.json()

  # Find player props markets
  props = []
  for bookmaker, markets in data['bookmakers'].items():
      for market in markets:
          if 'Props' in market['name'] or 'label' in market:
              props.append({'bookmaker': bookmaker, 'market': market})

  print(f"Found {len(props)} player prop markets")
  ```
</CodeGroup>

## Example Response

```json theme={null}
{
  "id": 123456,
  "sport": {
    "name": "Basketball",
    "slug": "basketball"
  },
  "league": {
    "name": "NBA",
    "slug": "nba"
  },
  "home": "Los Angeles Lakers",
  "away": "Boston Celtics",
  "date": "2025-10-15T19:00:00Z",
  "status": "pending",
  "bookmakers": {
    "DraftKings": [
      {
        "name": "Player Props - Points",
        "odds": [
          {
            "label": "LeBron James",
            "hdp": 27.5,
            "over": "1.90",
            "under": "1.90"
          },
          {
            "label": "Anthony Davis",
            "hdp": 24.5,
            "over": "1.95",
            "under": "1.85"
          }
        ]
      },
      {
        "name": "Player Props - Rebounds",
        "odds": [
          {
            "label": "Anthony Davis",
            "hdp": 11.5,
            "over": "1.88",
            "under": "1.92"
          }
        ]
      }
    ],
    "FanDuel": [
      {
        "name": "Player Props - Points",
        "odds": [
          {
            "label": "LeBron James",
            "hdp": 28.5,
            "over": "1.85",
            "under": "1.95"
          }
        ]
      }
    ]
  }
}
```

## Building a Props Comparison Tool

Compare player prop odds across multiple bookmakers:

```javascript theme={null}
function comparePlayerProps(oddsData, playerName, statType) {
  const results = [];

  Object.entries(oddsData.bookmakers).forEach(([bookmaker, markets]) => {
    markets.forEach(market => {
      // Check if this is the right prop type
      if (!market.name.includes(statType)) return;

      // Find the player
      const playerProp = market.odds.find(
        prop => prop.label === playerName
      );

      if (playerProp) {
        results.push({
          bookmaker,
          line: playerProp.hdp,
          over: parseFloat(playerProp.over),
          under: parseFloat(playerProp.under)
        });
      }
    });
  });

  // Find best over and under odds
  const bestOver = results.reduce((best, curr) =>
    curr.over > best.over ? curr : best
  );

  const bestUnder = results.reduce((best, curr) =>
    curr.under > best.under ? curr : best
  );

  return {
    player: playerName,
    stat: statType,
    allBooks: results,
    bestOver: {
      bookmaker: bestOver.bookmaker,
      line: bestOver.line,
      odds: bestOver.over
    },
    bestUnder: {
      bookmaker: bestUnder.bookmaker,
      line: bestUnder.line,
      odds: bestUnder.under
    }
  };
}

// Usage
const comparison = comparePlayerProps(
  oddsData,
  'LeBron James',
  'Points'
);

console.log(`\nBest odds for LeBron James Points:\n`);
console.log(`Over ${comparison.bestOver.line}: ${comparison.bestOver.odds} at ${comparison.bestOver.bookmaker}`);
console.log(`Under ${comparison.bestUnder.line}: ${comparison.bestUnder.odds} at ${comparison.bestUnder.bookmaker}`);
```

**Output:**

```
Best odds for LeBron James Points:

Over 27.5: 1.90 at DraftKings
Under 28.5: 1.95 at FanDuel
```

## NFL Player Props Example

Fetch quarterback passing yards props:

```javascript theme={null}
async function getNFLPlayerProps(eventId) {
  const apiKey = process.env.ODDS_API_KEY;
  const bookmakers = 'DraftKings,FanDuel,BetMGM,Caesars';

  const response = await fetch(
    `https://api.odds-api.io/v3/odds?apiKey=${apiKey}&eventId=${eventId}&bookmakers=${bookmakers}`
  );

  const data = await response.json();

  // Extract passing yards props
  const passingYards = [];

  Object.entries(data.bookmakers).forEach(([bookmaker, markets]) => {
    markets.forEach(market => {
      if (market.name.includes('Passing Yards')) {
        market.odds.forEach(prop => {
          passingYards.push({
            bookmaker,
            player: prop.label,
            line: prop.hdp,
            overOdds: prop.over,
            underOdds: prop.under
          });
        });
      }
    });
  });

  return passingYards;
}

// Usage
const props = await getNFLPlayerProps(789012);
console.log(`Found ${props.length} passing yards props`);

props.forEach(prop => {
  console.log(`${prop.player} - ${prop.line} yards (${prop.bookmaker})`);
  console.log(`  Over: ${prop.overOdds} | Under: ${prop.underOdds}`);
});
```

## Building a Props Alert System

Get notified when props lines move significantly:

```javascript theme={null}
class PropsMonitor {
  constructor(apiKey, eventId, bookmakers) {
    this.apiKey = apiKey;
    this.eventId = eventId;
    this.bookmakers = bookmakers;
    this.previousLines = new Map();
  }

  async checkForLineMovement() {
    const response = await fetch(
      `https://api.odds-api.io/v3/odds?apiKey=${this.apiKey}&eventId=${this.eventId}&bookmakers=${this.bookmakers}`
    );

    const data = await response.json();

    Object.entries(data.bookmakers).forEach(([bookmaker, markets]) => {
      markets.forEach(market => {
        if (!market.name.includes('Props')) return;

        market.odds.forEach(prop => {
          const key = `${bookmaker}-${market.name}-${prop.label}`;
          const currentLine = prop.hdp;
          const previousLine = this.previousLines.get(key);

          if (previousLine && currentLine !== previousLine) {
            const movement = currentLine - previousLine;
            this.sendAlert({
              player: prop.label,
              stat: market.name,
              bookmaker,
              previousLine,
              currentLine,
              movement,
              direction: movement > 0 ? '⬆️ UP' : '⬇️ DOWN'
            });
          }

          this.previousLines.set(key, currentLine);
        });
      });
    });
  }

  sendAlert(data) {
    console.log(`
🚨 Line Movement Alert!

${data.player} - ${data.stat}
Bookmaker: ${data.bookmaker}

${data.previousLine} → ${data.currentLine} (${data.direction})
Movement: ${Math.abs(data.movement).toFixed(1)} points
    `.trim());
  }

  start(intervalSeconds = 30) {
    console.log('Starting props monitor...');
    this.checkForLineMovement();
    setInterval(() => this.checkForLineMovement(), intervalSeconds * 1000);
  }
}

// Usage
const monitor = new PropsMonitor(
  process.env.ODDS_API_KEY,
  123456,
  'DraftKings,FanDuel'
);

monitor.start(30); // Check every 30 seconds
```

## Fantasy + Props Integration

Combine fantasy projections with betting odds:

```javascript theme={null}
async function combineFantasyAndProps(eventId, fantasyProjections) {
  const apiKey = process.env.ODDS_API_KEY;

  const response = await fetch(
    `https://api.odds-api.io/v3/odds?apiKey=${apiKey}&eventId=${eventId}&bookmakers=DraftKings`
  );

  const data = await response.json();

  // Compare fantasy projections vs. betting lines
  const analysis = fantasyProjections.map(projection => {
    const playerProps = findPlayerProps(data, projection.player);

    return {
      player: projection.player,
      fantasyProjection: projection.points,
      bettingLine: playerProps?.hdp,
      difference: projection.points - (playerProps?.hdp || 0),
      recommendation: projection.points > (playerProps?.hdp || 0) ? 'Over' : 'Under'
    };
  });

  return analysis;
}

function findPlayerProps(oddsData, playerName) {
  for (const [bookmaker, markets] of Object.entries(oddsData.bookmakers)) {
    for (const market of markets) {
      if (market.name.includes('Points')) {
        const prop = market.odds.find(p => p.label === playerName);
        if (prop) return prop;
      }
    }
  }
  return null;
}
```

## Sport-Specific Props Coverage

### NBA Props

* Points, rebounds, assists
* Three-pointers made
* Double-doubles, triple-doubles
* Steals, blocks
* Points + rebounds + assists

### NFL Props

* Passing yards, touchdowns, completions
* Rushing yards, attempts, touchdowns
* Receptions, receiving yards, receiving TDs
* Kicking points

### MLB Props

* Pitcher strikeouts
* Batter home runs, hits, total bases
* RBIs, runs scored
* Stolen bases

### NHL Props

* Goals, assists, points
* Shots on goal
* Saves (goalies)
* Power play points

## Best Practices

<AccordionGroup>
  <Accordion title="Update Frequently">
    Props lines move faster than main markets. Poll every 15-30 seconds for pre-game, 5-10 seconds for live.
  </Accordion>

  <Accordion title="Handle Missing Data">
    Not all bookmakers offer props for all players. Always check if data exists before processing.
  </Accordion>

  <Accordion title="Compare Lines Across Books">
    Props lines can vary significantly between bookmakers - always show users the best available odds.
  </Accordion>

  <Accordion title="Show Historical Trends">
    Display how a player's props line has moved over time to help users make informed decisions.
  </Accordion>

  <Accordion title="Filter by Availability">
    Some props only appear close to game time. Monitor regularly and update your UI when new props become available.
  </Accordion>
</AccordionGroup>

## Use Cases for Developers

<CardGroup cols={2}>
  <Card title="Props Comparison" icon="scale-balanced">
    Let users compare player prop odds across all major bookmakers
  </Card>

  <Card title="Fantasy Integration" icon="star">
    Combine fantasy stats with live betting odds for player projections
  </Card>

  <Card title="Line Movement Alerts" icon="bell">
    Notify users when prop lines shift significantly
  </Card>

  <Card title="Same Game Parlays" icon="layer-group">
    Build tools for creating and analyzing same-game parlay combinations
  </Card>
</CardGroup>

## Next Steps

<CardGroup cols={2}>
  <Card title="Comparing Odds" icon="scale-balanced" href="/examples/comparing-odds">
    Learn how to compare odds across bookmakers
  </Card>

  <Card title="Value Bets" icon="magnifying-glass-dollar" href="/examples/finding-value-bets">
    Find profitable betting opportunities
  </Card>

  <Card title="API Reference" icon="code" href="/api-reference/introduction">
    Explore the full API documentation
  </Card>

  <Card title="Best Practices" icon="lightbulb" href="/guides/best-practices">
    Optimize your implementation
  </Card>
</CardGroup>

<Tip>
  Ready to integrate player props? [Get your free API key](https://odds-api.io/#pricing) and start building today!
</Tip>