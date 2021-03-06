/* parser generated by jison 0.4.4 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var query = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"select_statement":4,"EOF":5,"SELECT":6,"fields":7,"where_clause":8,"orderby_clause":9,"column_list":10,"*":11,"column":12,",":13,"NAME":14,"WHERE":15,"filter":16,"conjunction":17,"AND":18,"disjunction":19,"OR":20,"predicate":21,"(":22,")":23,"NOT":24,"comparison_predicate":25,"contains_predicate":26,"location_predicate":27,"COMPARISON":28,"literal":29,"CONTAINS":30,"STRING":31,"WITHIN":32,"location":33,"NUMBER":34,"OF":35,"coordinates":36,"ORDERBY":37,"sort_list":38,"sort_expression":39,"direction":40,"ASC":41,"DESC":42,"boolean":43,"TRUE":44,"FALSE":45,"NULL":46,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"SELECT",11:"*",13:",",14:"NAME",15:"WHERE",18:"AND",20:"OR",22:"(",23:")",24:"NOT",28:"COMPARISON",30:"CONTAINS",31:"STRING",32:"WITHIN",34:"NUMBER",35:"OF",37:"ORDERBY",41:"ASC",42:"DESC",44:"TRUE",45:"FALSE",46:"NULL"},
productions_: [0,[3,2],[4,4],[7,1],[7,1],[10,1],[10,3],[12,1],[8,0],[8,2],[17,3],[19,3],[16,1],[16,1],[16,1],[16,3],[16,2],[21,1],[21,1],[21,1],[25,3],[26,3],[27,3],[33,3],[36,3],[9,0],[9,2],[38,1],[38,3],[39,2],[40,0],[40,1],[40,1],[43,1],[43,1],[29,1],[29,1],[29,1],[29,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]; 
break;
case 2: this.$ = new yy.SelectStatementNode($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 4: this.$ = new yy.FieldListNode('*'); 
break;
case 5: this.$ = new yy.FieldListNode($$[$0]); 
break;
case 6: $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 9: this.$ = new yy.FilterNode($$[$0]); 
break;
case 10: this.$ = new yy.ConjunctionNode($$[$0-2], $$[$0]); 
break;
case 11: this.$ = new yy.DisjunctionNode($$[$0-2], $$[$0]); 
break;
case 15: this.$ = $$[$0-1] 
break;
case 16: this.$ = $$[$0].negate(); 
break;
case 20: this.$ = new yy.ComparisonPredicateNode($$[$0-2], $$[$0-1], $$[$0]); 
break;
case 21: this.$ = new yy.ContainsPredicateNode($$[$0-2], $$[$0]); 
break;
case 22: this.$ = new yy.LocationPredicateNode($$[$0-2], $$[$0]); 
break;
case 23: this.$ = new yy.LocationNode($$[$0-2], $$[$0]); 
break;
case 24: this.$ = new yy.CoordinatesNode($$[$0-2], $$[$0]); 
break;
case 26: this.$ = new yy.OrderByNode($$[$0]); 
break;
case 27: this.$ = new yy.SortListNode($$[$0]); 
break;
case 28: $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 29: this.$ = new yy.SortNode($$[$0-1], $$[$0]); 
break;
}
},
table: [{3:1,4:2,6:[1,3]},{1:[3]},{5:[1,4]},{7:5,10:6,11:[1,7],12:8,14:[1,9]},{1:[2,1]},{5:[2,8],8:10,15:[1,11],37:[2,8]},{5:[2,3],13:[1,12],15:[2,3],37:[2,3]},{5:[2,4],15:[2,4],37:[2,4]},{5:[2,5],13:[2,5],15:[2,5],37:[2,5]},{5:[2,7],13:[2,7],15:[2,7],28:[2,7],30:[2,7],32:[2,7],37:[2,7]},{5:[2,25],9:13,37:[1,14]},{12:24,14:[1,9],16:15,17:17,19:18,21:16,22:[1,19],24:[1,20],25:21,26:22,27:23},{12:25,14:[1,9]},{5:[2,2]},{14:[1,28],38:26,39:27},{5:[2,9],18:[1,29],20:[1,30],37:[2,9]},{5:[2,12],18:[2,12],20:[2,12],23:[2,12],37:[2,12]},{5:[2,13],18:[2,13],20:[2,13],23:[2,13],37:[2,13]},{5:[2,14],18:[2,14],20:[2,14],23:[2,14],37:[2,14]},{12:24,14:[1,9],16:31,17:17,19:18,21:16,22:[1,19],24:[1,20],25:21,26:22,27:23},{12:24,14:[1,9],16:32,17:17,19:18,21:16,22:[1,19],24:[1,20],25:21,26:22,27:23},{5:[2,17],18:[2,17],20:[2,17],23:[2,17],37:[2,17]},{5:[2,18],18:[2,18],20:[2,18],23:[2,18],37:[2,18]},{5:[2,19],18:[2,19],20:[2,19],23:[2,19],37:[2,19]},{28:[1,33],30:[1,34],32:[1,35]},{5:[2,6],13:[2,6],15:[2,6],37:[2,6]},{5:[2,26],13:[1,36]},{5:[2,27],13:[2,27]},{5:[2,30],13:[2,30],40:37,41:[1,38],42:[1,39]},{12:24,14:[1,9],16:40,17:17,19:18,21:16,22:[1,19],24:[1,20],25:21,26:22,27:23},{12:24,14:[1,9],16:41,17:17,19:18,21:16,22:[1,19],24:[1,20],25:21,26:22,27:23},{18:[1,29],20:[1,30],23:[1,42]},{5:[2,16],18:[2,16],20:[2,16],23:[2,16],37:[2,16]},{29:43,31:[1,45],34:[1,44],43:46,44:[1,48],45:[1,49],46:[1,47]},{31:[1,50]},{33:51,34:[1,52]},{14:[1,28],39:53},{5:[2,29],13:[2,29]},{5:[2,31],13:[2,31]},{5:[2,32],13:[2,32]},{5:[2,10],18:[2,10],20:[2,10],23:[2,10],37:[2,10]},{5:[2,11],18:[1,29],20:[2,11],23:[2,11],37:[2,11]},{5:[2,15],18:[2,15],20:[2,15],23:[2,15],37:[2,15]},{5:[2,20],18:[2,20],20:[2,20],23:[2,20],37:[2,20]},{5:[2,35],18:[2,35],20:[2,35],23:[2,35],37:[2,35]},{5:[2,36],18:[2,36],20:[2,36],23:[2,36],37:[2,36]},{5:[2,37],18:[2,37],20:[2,37],23:[2,37],37:[2,37]},{5:[2,38],18:[2,38],20:[2,38],23:[2,38],37:[2,38]},{5:[2,33],18:[2,33],20:[2,33],23:[2,33],37:[2,33]},{5:[2,34],18:[2,34],20:[2,34],23:[2,34],37:[2,34]},{5:[2,21],18:[2,21],20:[2,21],23:[2,21],37:[2,21]},{5:[2,22],18:[2,22],20:[2,22],23:[2,22],37:[2,22]},{35:[1,54]},{5:[2,28],13:[2,28]},{34:[1,56],36:55},{5:[2,23],18:[2,23],20:[2,23],23:[2,23],37:[2,23]},{13:[1,57]},{34:[1,58]},{5:[2,24],18:[2,24],20:[2,24],23:[2,24],37:[2,24]}],
defaultActions: {4:[2,1],13:[2,2]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined') {
        this.lexer.yylloc = {};
    }
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === 'function') {
        this.parseError = this.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || EOF;
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: this.lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: this.lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.2.0 */
var lexer = (function(){
var lexer = {

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input) {
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            if (this.options.backtrack_lexer) {
                delete backup;
            }
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        if (this.options.backtrack_lexer) {
            delete backup;
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:
                                          this.begin('sel');
                                          return 6;
                                        
break;
case 2:return 13
break;
case 3:return 11
break;
case 4:
                                          this.popState(); /* in: INITIAL */
                                          this.begin('fltr');
                                          return 15;
                                        
break;
case 5:
                                          this.popState(); /* in: INITIAL */
                                          this.begin('ordby');
                                          return 37;
                                        
break;
case 6:return 14
break;
case 7:
                                          yy_.yytext = yy_.yytext.slice(1, -1);
                                          return 14;
                                        
break;
case 8:return 18
break;
case 9:return 20
break;
case 10:return 24
break;
case 11:return 18
break;
case 12:return 20
break;
case 13:
                                          this.popState(); /* in: INITIAL */
                                          return 5;
                                        
break;
case 14:
                                          this.begin('asgn');
                                          return 14;
                                        
break;
case 15:
                                          this.begin('asgn');
                                          yy_.yytext = yy_.yytext.slice(1, -1);
                                          return 14;
                                        
break;
case 16:return 22
break;
case 17:return 23
break;
case 18:return 28
break;
case 19:
                                          yy_.yytext = letterify(yy_.yytext);
                                          return 28;
                                        
break;
case 20:
                                          yy_.yytext = letterify(yy_.yytext);
                                          return 28;
                                        
break;
case 21:return 30
break;
case 22:
                                          this.begin('loc');
                                          return 32;
                                        
break;
case 23:
                                          this.popState(); /* in: fltr */
                                          return 31;
                                        
break;
case 24:
                                          this.popState(); /* in: fltr */
                                          return 34;
                                        
break;
case 25:
                                          this.popState(); /* in fltr */
                                          yy_.yytext = true;
                                          return 44;
                                        
break;
case 26:
                                          this.popState(); /* in fltr */
                                          yy_.yytext = false;
                                          return 45;
                                        
break;
case 27:
                                          this.popState(); /* in fltr */
                                          yy_.yytext = null;
                                          return 46;
                                        
break;
case 28:return 34
break;
case 29:return 35
break;
case 30:
                                          this.popState(); /* in: asgn */
                                          this.popState(); /* in: fltr */
                                          return 18;
                                        
break;
case 31:
                                          this.popState(); /* in: asgn */
                                          this.popState(); /* in: fltr */
                                          return 20;
                                        
break;
case 32:
                                          this.popState(); /* in: asgn */
                                          this.popState(); /* in: fltr */
                                          this.begin('ordby');
                                          return 37;
                                        
break;
case 33:return 41
break;
case 34:return 42
break;
case 35:return 14
break;
case 36:
                                          yy_.yytext = yy_.yytext.slice(1, -1);
                                          return 14;
                                        
break;
case 37:return 5
break;
}
},
rules: [/^(?:\s+)/i,/^(?:select\b)/i,/^(?:,)/i,/^(?:\*)/i,/^(?:where\b)/i,/^(?:order by\b)/i,/^(?:([A-Za-z0-9_-][\.A-Za-z0-9_-]*))/i,/^(?:(\[(?:(?!\])[^\\]|\\.)*\]))/i,/^(?:and\b)/i,/^(?:or\b)/i,/^(?:not\b)/i,/^(?:&&)/i,/^(?:\|\|)/i,/^(?:$)/i,/^(?:([A-Za-z0-9_-][\.A-Za-z0-9_-]*))/i,/^(?:(\[(?:(?!\])[^\\]|\\.)*\]))/i,/^(?:\()/i,/^(?:\))/i,/^(?:eq|gt|lt|gte|lte\b)/i,/^(?:>=|<=)/i,/^(?:=|>|<)/i,/^(?:contains\b)/i,/^(?:within\b)/i,/^(?:(["'])(?:(?!\1)[^\\]|\\.)*\1)/i,/^(?:([+-]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?))/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:null\b)/i,/^(?:([+-]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?))/i,/^(?:of\b)/i,/^(?:and\b)/i,/^(?:or\b)/i,/^(?:order by\b)/i,/^(?:ASC\b)/i,/^(?:DESC\b)/i,/^(?:([A-Za-z0-9_-][\.A-Za-z0-9_-]*))/i,/^(?:(\[(?:(?!\])[^\\]|\\.)*\]))/i,/^(?:$)/i],
conditions: {"sel":{"rules":[0,2,3,4,5,6,7,13],"inclusive":false},"fltr":{"rules":[0,2,5,8,9,10,11,12,13,14,15,16,17],"inclusive":false},"asgn":{"rules":[0,18,19,20,21,22,23,24,25,26,27],"inclusive":false},"loc":{"rules":[0,2,28,29,30,31,32,37],"inclusive":false},"ordby":{"rules":[0,2,13,33,34,35,36],"inclusive":false},"INITIAL":{"rules":[0,1,37],"inclusive":true}}
};
function letterify(op) {
  switch(op) {
    case '=' : op = 'eq'; break;
    case '>' : op = 'gt'; break;
    case '<' : op = 'lt'; break;
    case '>=' : op = 'gte'; break;
    case '<=' : op = 'lte'; break;
  }

  return op;
};
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = query;
exports.Parser = query.Parser;
exports.parse = function () { return query.parse.apply(query, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}