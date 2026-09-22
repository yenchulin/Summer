<img src="https://github.com/yenchulin/Summer/raw/main/logo.png">

# Summer

A Chrome extension that uses OpenAI models to summarize user-selected text directly from any webpage.

Select a paragraph, right-click, choose **"Summarize with Summer"**, and the generated summary appears directly on the page.

![selection](https://github.com/yenchulin/Summer/raw/main/Summer-selection.png)

![result](https://github.com/yenchulin/Summer/raw/main/Summer-result.png)

## Features

* Summarize selected text directly from the browser context menu
* Display results in an injected floating UI
* Show loading and error states while generating a summary
* Store the user's OpenAI API key using Chrome Storage
* Built with vanilla JavaScript, HTML, and CSS
* Built on Chrome Extension Manifest V3

## How It Works

```text
User selects text
       ↓
Right-click → "Summarize with Summer"
       ↓
Chrome context menu event
       ↓
Extension service worker
       ↓
Retrieve API key from Chrome Storage
       ↓
Send request to content script
       ↓
Content script displays loading state
       ↓
OpenAI API
       ↓
Render generated summary
```

## Architecture

Summer consists of three main extension contexts:

### Service Worker

The service worker handles extension-level events and Chrome APIs.

Responsibilities:

* Register the context menu
* Handle context menu clicks
* Retrieve the stored API key
* Send messages to the content script

### Content Script

The content script runs on web pages and owns the in-page user interface.

Responsibilities:

* Receive messages from the service worker
* Create the floating summary panel
* Display loading, success, and error states
* Send the selected text to the OpenAI API
* Render the generated summary

### Popup

The popup provides a simple settings interface for storing the OpenAI API key.

## Tech Stack

* JavaScript
* HTML
* CSS
* Chrome Extension APIs
* Manifest V3
* OpenAI API

## Project Structure

```text
.
├── manifest.json
├── background.js
├── content.js
├── content.css
├── popup.html
├── popup.js
├── main.css
└── logo.png
```

## Installation

1. Clone this repository.

2. Open Chrome and navigate to:

```text
chrome://extensions
```

3. Enable **Developer mode**.

4. Click **Load unpacked**.

5. Select the project directory.

6. Click the Summer extension icon and enter your OpenAI API key.

## Usage

1. Open a webpage containing text.
2. Select the text you want to summarize.
3. Right-click the selection.
4. Select **"Summarize with Summer"**.
5. Summer will display a loading indicator while the summary is generated.
6. The generated summary will appear in the floating result panel.

## Configuration

Summer requires an OpenAI API key to generate summaries.

The current implementation stores the key using Chrome's extension storage and uses it when making API requests.

For development purposes, create an OpenAI API key through the OpenAI Platform before using the extension.

## Project Design

The project was intentionally implemented without a frontend framework to explore browser extension fundamentals, including:

* Manifest V3 architecture
* Extension service workers
* Chrome context menus
* Content scripts
* Cross-context message passing
* Browser storage
* Asynchronous API requests
* Dynamic DOM manipulation
* Loading and error states

## Known Limitations

The current implementation is a lightweight prototype and has several areas that would need further work before production use:

* OpenAI requests are currently initiated from the content script.
* API credentials are passed between extension contexts.
* The extension currently requests access to all URLs through its content script configuration.
* The generated response is rendered directly into the page UI.
* There is no request cancellation or timeout handling.
* API errors are surfaced with limited user-friendly messaging.
* Multiple requests can create multiple result panels.

## Future Improvements

Potential improvements include:

* Move OpenAI requests into the extension service worker or a dedicated backend service.
* Avoid exposing API credentials to content scripts.
* Replace broad page access with a more limited permission model such as `activeTab`.
* Introduce a typed message contract between extension contexts.
* Add request cancellation with `AbortController`.
* Improve API error handling and validation.
* Isolate injected UI styles using Shadow DOM.
* Add automated tests for message handling and API response parsing.
* Support additional actions such as translation or text explanation.

## License

This project is for educational and portfolio purposes.
