# Programming Tasks

## 2. Word Search 

### Prerequisites:

- Python installed on your system (Python 3.x recommended).

### Execution Steps:

Run the script using the following command:

```
python3 word-search.py
```

The script is fully commented containing detailed step-by-step instructions for its execution.

### Output Explanation

Given the board:

```
[ 
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E']
]
```

And being the index's of the board:

```
[ 
  [(0,0), (0,1), (0,2), (0,3)],
  [(1,0), (1,1), (1,2), (1,3)],
  [(2,0), (2,1), (2,2), (2,3)]
]
```

- The word "ABCCED" exist at the positions: [(0,0), (0,1), (0,2), (1,2), (2,2), (2,1)].
- The word "SEE" exist at the positions: [(1, 3), (2, 3), (2, 2)].
- The word "ABCB" not exist.
- The word "ASADECFD" not exist. It would be necessary repeat letter.
- The word "ESEEDASA" exist at the positions: [(0, 3), (1, 3), (2, 3), (2, 2), (2, 1), (2, 0), (1, 0), (0, 0)].
- The word "CFSADEESE" exist at the positions: [(1, 2), (1, 1), (1, 0), (2, 0), (2, 1), (2, 2), (2, 3), (1, 3), (0, 3)].

## 3. Crawl Issue Reports
 
### Prerequisites:

- Node.js version >=18 installed on your system. 

### Execution Steps:

Install dependencies by running:

```
npm install
```

```
node crawl-issue-reports.js
```

### Output Explanation

The script crawls Apache Camel project's Jira issue reports, extracts relevant details, and stores them in a CSV file named `camel_issues.csv`. The CSV file contains the following information for each issue:

Type
Assignee
Created Date
Created Epoch
Description
Comments

Note: Each request made can be seen in the console.

Note: The script implements throttling to prevent excessive requests and potential server blocks.

Additionally, the specific issue report requested in the task example can be found at line 10582 of the `camel_issues.csv` file. Here is the corresponding entry:


`Bug,Claus Ibsen,2016-12-14T14:42:08+0000,1481726528,Assume I have rest path   rest("/test").get().type(ClassA.class).to("direct:someRoute");  rest("/testSub").get().type(ClassB.class).to("direct:someOtherRoute");    And in the type ClassA contains a reference to ClassB.  Within the Swagger Doc the path for ClassA renders as expected:  /test:     get:       responses:         200:           schema:             $ref: '#/definitions/ClassA'    However ClassB gets a string parameter scheme    /testSub:     get:       responses:         200:           schema:              type : 'string'              format : 'com.ClassB'    However I'd expect it to be:  /testSub:     get:       responses:         200:           schema:             $ref: '#/definitions/ClassB',ASF GitHub Bot:1481727356:14/Dec/16 14:55:"GitHub user bobpaulin opened a pull request:  https://github.com/apache/camel/pull/1348  CAMEL-10597 - Allow addition of x-className to empty VendorExtensions  You can merge this pull request into a Git repository by running:  $ git pull https://github.com/bobpaulin/camel CAMEL-10597  Alternatively you can review and apply these changes as the patch at:  https://github.com/apache/camel/pull/1348.patch  To close this pull request  make a commit to your master/trunk branch with (at least) the following in the commit message:  This closes #1348". Bob Paulin:1481727366:14/Dec/16 14:56:"PR included https://github.com/apache/camel/pull/1348". Claus Ibsen:1481729518:14/Dec/16 15:31:"Thanks for the PR". ASF GitHub Bot:1481729644:14/Dec/16 15:34:"Github user bobpaulin closed the pull request at:  https://github.com/apache/camel/pull/1348". Andrea Cosentino:1481810725:15/Dec/16 14:05:"2.17.x is affected too davsclaus". Claus Ibsen:1481811973:15/Dec/16 14:26:"Thanks its backported now".`
