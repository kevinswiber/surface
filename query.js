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
symbols_: {"error":2,"root":3,"select_statement":4,"EOF":5,"SELECT":6,"fields":7,"where_clause":8,"orderby_clause":9,"column_list":10,"STAR":11,"column":12,"COMMA":13,"NAME":14,"WHERE":15,"filter":16,"conjunction":17,"disjunction":18,"predicate":19,"AND":20,"OR":21,"comparison_predicate":22,"contains_predicate":23,"location_predicate":24,"COMPARISON":25,"literal":26,"NOT":27,"CONTAINS":28,"STRING":29,"WITHIN":30,"location":31,"NUMBER":32,"OF":33,"coordinates":34,"ORDERBY":35,"sort_list":36,"sort_expression":37,"direction":38,"ASC":39,"DESC":40,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"SELECT",11:"STAR",13:"COMMA",14:"NAME",15:"WHERE",20:"AND",21:"OR",25:"COMPARISON",27:"NOT",28:"CONTAINS",29:"STRING",30:"WITHIN",32:"NUMBER",33:"OF",35:"ORDERBY",39:"ASC",40:"DESC"},
productions_: [0,[3,2],[4,4],[7,1],[7,1],[10,1],[10,3],[12,1],[8,0],[8,2],[16,0],[16,1],[16,1],[16,1],[17,3],[17,3],[18,3],[18,3],[19,1],[19,1],[19,1],[22,3],[22,4],[23,3],[23,4],[24,3],[24,4],[31,3],[34,3],[9,0],[9,2],[36,1],[36,3],[37,2],[38,0],[38,1],[38,1],[26,1],[26,1]],
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
case 14: this.$ = new yy.ConjunctionNode($$[$0-2], $$[$0]); 
break;
case 15: this.$ = new yy.ConjunctionNode($$[$0-2], $$[$0]); 
break;
case 16: this.$ = new yy.DisjunctionNode($$[$0-2], $$[$0]); 
break;
case 17: this.$ = new yy.DisjunctionNode($$[$0-2], $$[$0]); 
break;
case 21: this.$ = new yy.ComparisonPredicateNode($$[$0-2], $$[$0-1], $$[$0], false); 
break;
case 22: this.$ = new yy.ComparisonPredicateNode($$[$0-2], $$[$0-1], $$[$0], true); 
break;
case 23: this.$ = new yy.ContainsPredicateNode($$[$0-2], $$[$0], false); 
break;
case 24: this.$ = new yy.ContainsPredicateNode($$[$0-2], $$[$0], true); 
break;
case 25: this.$ = new yy.LocationPredicateNode($$[$0-2], $$[$0], false); 
break;
case 26: this.$ = new yy.LocationPredicateNode($$[$0-2], $$[$0], true); 
break;
case 27: this.$ = new yy.LocationNode($$[$0-2], $$[$0]); 
break;
case 28: this.$ = new yy.CoordinatesNode($$[$0-2], $$[$0]); 
break;
case 30: this.$ = new yy.OrderByNode($$[$0]); 
break;
case 31: this.$ = new yy.SortListNode($$[$0]); 
break;
case 32: $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 33: this.$ = new yy.SortNode($$[$0-1], $$[$0]); 
break;
}
},
table: [{3:1,4:2,6:[1,3]},{1:[3]},{5:[1,4]},{7:5,10:6,11:[1,7],12:8,14:[1,9]},{1:[2,1]},{5:[2,8],8:10,15:[1,11],35:[2,8]},{5:[2,3],13:[1,12],15:[2,3],35:[2,3]},{5:[2,4],15:[2,4],35:[2,4]},{5:[2,5],13:[2,5],15:[2,5],35:[2,5]},{5:[2,7],13:[2,7],15:[2,7],25:[2,7],28:[2,7],30:[2,7],35:[2,7]},{5:[2,29],9:13,35:[1,14]},{5:[2,10],12:22,14:[1,9],16:15,17:16,18:17,19:18,22:19,23:20,24:21,27:[1,23],35:[2,10]},{12:24,14:[1,9]},{5:[2,2]},{14:[1,27],36:25,37:26},{5:[2,9],35:[2,9]},{5:[2,11],20:[1,28],21:[1,29],35:[2,11]},{5:[2,12],21:[1,30],35:[2,12]},{5:[2,13],20:[1,31],35:[2,13]},{5:[2,18],20:[2,18],21:[2,18],35:[2,18]},{5:[2,19],20:[2,19],21:[2,19],35:[2,19]},{5:[2,20],20:[2,20],21:[2,20],35:[2,20]},{25:[1,32],28:[1,33],30:[1,34]},{12:35,14:[1,9]},{5:[2,6],13:[2,6],15:[2,6],35:[2,6]},{5:[2,30],13:[1,36]},{5:[2,31],13:[2,31]},{5:[2,34],13:[2,34],38:37,39:[1,38],40:[1,39]},{12:22,14:[1,9],19:40,22:19,23:20,24:21,27:[1,23]},{12:22,14:[1,9],19:41,22:19,23:20,24:21,27:[1,23]},{12:22,14:[1,9],19:42,22:19,23:20,24:21,27:[1,23]},{12:22,14:[1,9],19:43,22:19,23:20,24:21,27:[1,23]},{26:44,29:[1,46],32:[1,45]},{29:[1,47]},{31:48,32:[1,49]},{25:[1,50],28:[1,51],30:[1,52]},{14:[1,27],37:53},{5:[2,33],13:[2,33]},{5:[2,35],13:[2,35]},{5:[2,36],13:[2,36]},{5:[2,15],20:[2,15],21:[2,15],35:[2,15]},{5:[2,16],21:[2,16],35:[2,16]},{5:[2,17],21:[2,17],35:[2,17]},{5:[2,14],20:[2,14],21:[2,14],35:[2,14]},{5:[2,21],20:[2,21],21:[2,21],35:[2,21]},{5:[2,37],20:[2,37],21:[2,37],35:[2,37]},{5:[2,38],20:[2,38],21:[2,38],35:[2,38]},{5:[2,23],20:[2,23],21:[2,23],35:[2,23]},{5:[2,25],20:[2,25],21:[2,25],35:[2,25]},{33:[1,54]},{26:55,29:[1,46],32:[1,45]},{29:[1,56]},{31:57,32:[1,49]},{5:[2,32],13:[2,32]},{32:[1,59],34:58},{5:[2,22],20:[2,22],21:[2,22],35:[2,22]},{5:[2,24],20:[2,24],21:[2,24],35:[2,24]},{5:[2,26],20:[2,26],21:[2,26],35:[2,26]},{5:[2,27],20:[2,27],21:[2,27],35:[2,27]},{13:[1,60]},{32:[1,61]},{5:[2,28],20:[2,28],21:[2,28],35:[2,28]}],
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
                                          return 35;
                                        
break;
case 6:return 14
break;
case 7:
                                          yy_.yytext = yy_.yytext.slice(1, -1);
                                          return 14;
                                        
break;
case 8:return 20
break;
case 9:return 21
break;
case 10:return 27
break;
case 11:return 20
break;
case 12:return 21
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
case 16:return 25
break;
case 17:
                                          yy_.yytext = letterify(yy_.yytext);
                                          return 25;
                                        
break;
case 18:return 28
break;
case 19:
                                          this.begin('loc');
                                          return 30;
                                        
break;
case 20:
                                          this.popState(); /* in: fltr */
                                          return 29;
                                        
break;
case 21:
                                          this.popState(); /* in: fltr */
                                          return 32;
                                        
break;
case 22:return 32
break;
case 23:return 33
break;
case 24:
                                          this.popState(); /* in: asgn */
                                          this.popState(); /* in: fltr */
                                          return 20;
                                        
break;
case 25:
                                          this.popState(); /* in: asgn */
                                          this.popState(); /* in: fltr */
                                          return 21;
                                        
break;
case 26:
                                          this.popState(); /* in: asgn */
                                          this.popState(); /* in: fltr */
                                          this.begin('ordby');
                                          return 35;
                                        
break;
case 27:return 39
break;
case 28:return 40
break;
case 29:return 14
break;
case 30:
                                          yy_.yytext = yy_.yytext.slice(1, -1);
                                          return 14;
                                        
break;
case 31:return 5
break;
}
},
rules: [/^(?:\s+)/i,/^(?:select\b)/i,/^(?:,)/i,/^(?:\*)/i,/^(?:where\b)/i,/^(?:order by\b)/i,/^(?:([A-Za-z0-9_-][\.A-Za-z0-9_-]*))/i,/^(?:(\[(?:(?!\])[^\\]|\\.)*\]))/i,/^(?:and\b)/i,/^(?:or\b)/i,/^(?:not\b)/i,/^(?:&&)/i,/^(?:\|\|)/i,/^(?:$)/i,/^(?:([A-Za-z0-9_-][\.A-Za-z0-9_-]*))/i,/^(?:(\[(?:(?!\])[^\\]|\\.)*\]))/i,/^(?:eq|gt|lt|gte|lte\b)/i,/^(?:=|>|<|>=|<=)/i,/^(?:contains\b)/i,/^(?:within\b)/i,/^(?:(["'])(?:(?!\1)[^\\]|\\.)*\1)/i,/^(?:([+-]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?))/i,/^(?:([+-]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?))/i,/^(?:of\b)/i,/^(?:and\b)/i,/^(?:or\b)/i,/^(?:order by\b)/i,/^(?:ASC\b)/i,/^(?:DESC\b)/i,/^(?:([A-Za-z0-9_-][\.A-Za-z0-9_-]*))/i,/^(?:(\[(?:(?!\])[^\\]|\\.)*\]))/i,/^(?:$)/i],
conditions: {"sel":{"rules":[0,2,3,4,5,6,7,13],"inclusive":false},"fltr":{"rules":[0,2,5,8,9,10,11,12,13,14,15],"inclusive":false},"asgn":{"rules":[0,16,17,18,19,20,21],"inclusive":false},"loc":{"rules":[0,2,22,23,24,25,26,31],"inclusive":false},"ordby":{"rules":[0,2,13,27,28,29,30],"inclusive":false},"INITIAL":{"rules":[0,1,31],"inclusive":true}}
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