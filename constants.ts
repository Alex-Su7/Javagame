
import { Level, LevelProgress, Theme } from './types';

export const INITIAL_CODE_L1 = `public class Main {
    public static void main(String[] args) {
        // 在这里写下你的代码
        
    }
}`;

export const LEVELS: Level[] = [
  {
    id: 'L01',
    order: 1,
    title: '第一行 Java 代码',
    topic: '基础输出 (Output)',
    difficulty: 'Easy',
    description: '欢迎来到 Java 世界！你的第一个任务是让计算机“开口说话”。',
    task: '使用 `System.out.println` 在控制台准确输出 "Hello Java"。',
    initialCode: INITIAL_CODE_L1,
    expectedOutput: 'Hello Java',
    hintTopics: ['语法结构', '分号', '方法名称'],
    learningContent: {
      concept: "输出语句 (Print)",
      explanation: "在 Java 中，如果你想让电脑在屏幕上显示一段文字，你需要使用 `System.out.println()` 命令。这就像是告诉电脑：'请把括号里的这句话打印出来'。注意，文字必须包在双引号 `\" \"` 里面，而且每行代码结束要加分号 `;`。",
      exampleCode: `// 这是一个例子
System.out.println("你好，世界");
System.out.println("我爱编程");`
    },
    cheatSheet: `System.out.println("在这里写内容");`,
    story: {
      character: "J-Bot",
      avatar: "🤖",
      emotion: "ALERT",
      text: "滋...滋... 系统重启中。我的发声模块损坏了！操作员，请编写输出指令 `System.out.println` 发送握手信号，让我重新连接主控台！"
    }
  },
  {
    id: 'L02',
    order: 2,
    title: '年龄变量',
    topic: '变量 (int)',
    difficulty: 'Easy',
    description: '计算机需要“记忆”数据，我们使用“变量 (Variable)”来存储信息。',
    task: '创建一个名为 `age` 的整数 (int) 变量，将其设置为 18，然后打印出来。',
    initialCode: `public class Main {
    public static void main(String[] args) {
        // 创建一个名为 'age' 的 int 变量
        
        // 打印这个变量
        
    }
}`,
    expectedOutput: '18',
    hintTopics: ['变量声明', '赋值', '打印变量'],
    learningContent: {
      concept: "变量 (Variable)",
      explanation: "变量就像是一个标有名字的盒子，用来存数据。`int` 代表这个盒子只能存整数（Integer）。`int age = 18;` 的意思是：造一个叫 `age` 的盒子，里面放数字 18。",
      exampleCode: `int score = 100; // 创建一个叫 score 的变量，存入 100
System.out.println(score); // 打印盒子里的东西`
    },
    cheatSheet: `int 变量名 = 数字;
System.out.println(变量名);`,
    story: {
      character: "J-Bot",
      avatar: "🤖",
      emotion: "HAPPY",
      text: "声音模块恢复正常！谢谢你。现在我们需要校准飞船的乘客数据系统。请申请一个内存空间（变量）来存储乘客的年龄信息。"
    }
  },
  {
    id: 'L03',
    order: 3,
    title: '基础数学',
    topic: '算术运算',
    difficulty: 'Easy',
    description: 'Java 很擅长数学运算。让我们来做个加法。',
    task: '计算 5 + 3 的结果，并直接打印出来。',
    initialCode: `public class Main {
    public static void main(String[] args) {
        // 计算并打印 5 + 3
        
    }
}`,
    expectedOutput: '8',
    hintTopics: ['运算符', '打印表达式', '数字不需要引号'],
    learningContent: {
      concept: "数学运算",
      explanation: "你可以直接在 `println` 的括号里写数学算式，电脑会帮你算出结果再打印。加号是 `+`，减号是 `-`，乘号是 `*`，除号是 `/`。",
      exampleCode: `System.out.println(10 + 20); // 会打印 30
System.out.println(10 - 5);  // 会打印 5`
    },
    cheatSheet: `System.out.println(数字 + 数字);
// 例如：
System.out.println(5 + 3);`,
    story: {
      character: "J-Bot",
      avatar: "🤖",
      emotion: "WORRIED",
      text: "警报！左侧推进器动力不足。我们需要重新计算能量分配。请快速帮我计算一下备用电池组的总电量 (5 + 3)，飞船需要这个数据！"
    }
  },
  {
    id: 'L04',
    order: 4,
    title: '文本拼接',
    topic: '字符串拼接',
    difficulty: 'Medium',
    description: '我们可以使用 `+` 符号将文字和数字连接在一起。',
    task: '打印 "My age is " 后面跟上数字 18。（结果应为："My age is 18"）',
    initialCode: `public class Main {
    public static void main(String[] args) {
        int age = 18;
        // 将文本 "My age is " 与变量 age 组合并打印
        
    }
}`,
    expectedOutput: 'My age is 18',
    hintTopics: ['字符串逻辑', '+ 号的作用', '空格处理'],
    learningContent: {
      concept: "字符串拼接",
      explanation: "当 `+` 号两边有一边是文字（字符串）时，它就不再是加法，而是“连接符”。它会把两边的内容粘在一起变成一句话。",
      exampleCode: `String name = "Tom";
System.out.println("Hello " + name); 
// 打印: Hello Tom`
    },
    cheatSheet: `System.out.println("文字" + 变量);`,
    story: {
      character: "J-Bot",
      avatar: "🤖",
      emotion: "NEUTRAL",
      text: "数据核心已修复。现在我们需要生成一份人类可读的身份报告。请把文字说明和刚才的年龄数据拼接在一起，发送给安保终端。"
    }
  },
  {
    id: 'L05',
    order: 5,
    title: '成年了吗？',
    topic: '条件判断 (If)',
    difficulty: 'Medium',
    description: '代码可以做决定。让我们检查一个人是否成年。',
    task: '如果 `age` 大于或等于 18，则打印 "Adult"。',
    initialCode: `public class Main {
    public static void main(String[] args) {
        int age = 20;
        // 在这里写一个 if 语句
        
    }
}`,
    expectedOutput: 'Adult',
    hintTopics: ['If 语法', '比较运算符', '代码块 {}'],
    learningContent: {
      concept: "条件判断 (if)",
      explanation: "`if` 语句用来做决定。如果圆括号 `()` 里的条件是真的，电脑就会执行花括号 `{}` 里的代码；如果是假的，就跳过。",
      exampleCode: `int score = 90;
if (score >= 60) {
    System.out.println("及格了");
}`
    },
    cheatSheet: `if (条件) {
    // 条件成立时执行
}`,
    story: {
      character: "J-Bot",
      avatar: "🤖",
      emotion: "ALERT",
      text: "前方进入深空管制区。系统需要自动筛选驾驶员资格。编写一个逻辑判断模块：只有年龄达标 (>=18)，才允许显示 'Adult' 标识通过闸机。"
    }
  },
  {
    id: 'L06',
    order: 6,
    title: '否则...',
    topic: '分支 (If-Else)',
    difficulty: 'Medium',
    description: '生活不只有“如果”，还有“否则”。当条件不满足时，我们需要做另一件事。',
    task: '当前 `score` 是 50。编写代码：如果分数大于等于 60，打印 "Pass"；否则打印 "Fail"。',
    initialCode: `public class Main {
    public static void main(String[] args) {
        int score = 50;
        // 补全 if-else 逻辑
        if (score >= 60) {
            
        } else {
            
        }
    }
}`,
    expectedOutput: 'Fail',
    hintTopics: ['else 关键字', '花括号配对', '逻辑覆盖'],
    learningContent: {
      concept: "分支判断 (If-Else)",
      explanation: "`if` 只管条件成立的情况。如果你想在条件**不成立**时执行另一段代码，就要用到 `else`。它就像路口的岔路，非左即右。",
      exampleCode: `boolean isRaining = false;
if (isRaining) {
    System.out.println("带伞");
} else {
    System.out.println("带墨镜");
}`
    },
    cheatSheet: `if (条件) {
    // 成立
} else {
    // 不成立
}`
  },
  {
    id: 'L07',
    order: 7,
    title: '多重条件',
    topic: '逻辑运算符 (&&)',
    difficulty: 'Medium',
    description: '有时候我们需要同时满足两个条件。比如：既要有钱，又要有时间。',
    task: '检查变量 `num`。如果它大于 10 **并且** 小于 20，打印 "Yes"。',
    initialCode: `public class Main {
    public static void main(String[] args) {
        int num = 15;
        // 使用 && 运算符
        if (num > 10     num < 20) {
            System.out.println("Yes");
        }
    }
}`,
    expectedOutput: 'Yes',
    hintTopics: ['&& 符号', '逻辑组合', '区间判断'],
    learningContent: {
      concept: "逻辑与 (AND)",
      explanation: "在 Java 中，`&&` 表示“并且”。只有当 `&&` 左右两边的条件**都**是真的，整个结果才是真的。",
      exampleCode: `int age = 25;
boolean hasTicket = true;
// 年龄达标 并且 有票
if (age > 18 && hasTicket) {
    System.out.println("允许进入");
}`
    },
    cheatSheet: `if (条件1 && 条件2) { ... }`
  },
  {
    id: 'L08',
    order: 8,
    title: '复读机',
    topic: 'For 循环',
    difficulty: 'Hard',
    description: '程序员最讨厌重复劳动。让计算机帮我们重复做事吧。',
    task: '使用 `for` 循环，连续打印 5 次 "Java"。',
    initialCode: `public class Main {
    public static void main(String[] args) {
        // 编写一个循环，运行 5 次
        for (int i = 0; i < 5; i++) {
            
        }
    }
}`,
    expectedOutput: 'Java\nJava\nJava\nJava\nJava',
    hintTopics: ['循环体', 'i 变量', '次数控制'],
    learningContent: {
      concept: "For 循环",
      explanation: "`for` 循环是编程中最常用的循环。`int i=0` 是起点；`i < 5` 是终点（条件）；`i++` 表示每次走一步。里面的代码会被重复执行。",
      exampleCode: `// 打印 0 到 2
for (int i = 0; i < 3; i++) {
    System.out.println(i);
}`
    },
    cheatSheet: `for (int i = 0; i < 次数; i++) {
    // 重复做的事
}`,
    story: {
      character: "J-Bot",
      avatar: "🤖",
      emotion: "HAPPY",
      text: "我们的信号发射器修好了！为了确保地球能收到信号，我们需要连续发送多次。请使用循环结构，重复发送 5 次 'Java' 信号。"
    }
  },
  {
    id: 'L09',
    order: 9,
    title: '倒计时',
    topic: 'While 循环',
    difficulty: 'Hard',
    description: '另一种循环方式是“只要...就一直...”。',
    task: '使用 `while` 循环，当 `count` 大于 0 时，打印 `count`，然后让 `count` 减 1。',
    initialCode: `public class Main {
    public static void main(String[] args) {
        int count = 3;
        // 只要 count 大于 0...
        while (count > 0) {
            
            // 别忘了让 count 变小，否则会死循环！
            
        }
    }
}`,
    expectedOutput: '3\n2\n1',
    hintTopics: ['循环条件', '自减运算', '死循环风险'],
    learningContent: {
      concept: "While 循环",
      explanation: "`while` 循环非常直白：只要括号里的条件是真的，它就一直跑。**注意**：你必须在循环里改变变量，否则它永远停不下来（死循环）！",
      exampleCode: `int hunger = 3;
while (hunger > 0) {
    System.out.println("吃一口饭");
    hunger = hunger - 1; // 饿度减 1
}`
    },
    cheatSheet: `while (条件) {
    // 逻辑
    // 更新条件变量
}`
  },
  {
    id: 'L10',
    order: 10,
    title: '累加求和',
    topic: '算法逻辑',
    difficulty: 'Hard',
    description: '这是经典的编程面试题：计算 1 到 5 所有数字的总和 (1+2+3+4+5)。',
    task: '使用循环计算 1 到 5 的和，并将结果保存到 `sum` 变量中，最后打印 `sum`。',
    initialCode: `public class Main {
    public static void main(String[] args) {
        int sum = 0;
        // 循环 1 到 5
        for (int i = 1; i <= 5; i++) {
            // 把 i 加到 sum 里
            
        }
        System.out.println(sum);
    }
}`,
    expectedOutput: '15',
    hintTopics: ['累加思想', 'sum = sum + i', '循环范围'],
    learningContent: {
      concept: "累加器模式",
      explanation: "求和就像存钱罐。`sum` 是存钱罐，初始是 0。循环里的 `i` 是每次要存进去的硬币。`sum = sum + i` 的意思是：把当前的钱和新硬币加起来，再放回存钱罐里。",
      exampleCode: `int total = 0;
for (int i = 1; i <= 3; i++) {
    total = total + i; // 0+1, 1+2, 3+3
}
System.out.println(total); // 6`
    },
    cheatSheet: `sum = sum + i; // 累加简写: sum += i;`
  },
  {
    id: 'L11',
    order: 11,
    title: '定义技能',
    topic: '方法 (Method)',
    difficulty: 'Hard',
    description: '代码写多了会很乱。我们可以把功能封装成“技能”（方法），方便重复使用。',
    task: '在 main 方法外面定义一个叫 `sayHi` 的方法，里面打印 "Hi"。然后在 main 里调用它。',
    initialCode: `public class Main {
    
    // 1. 在这里定义 sayHi 方法
    public static void sayHi() {
        
    }

    public static void main(String[] args) {
        // 2. 在这里调用 sayHi
        
    }
}`,
    expectedOutput: 'Hi',
    hintTopics: ['方法位置', '方法调用', 'static 关键字'],
    learningContent: {
      concept: "方法 (Method)",
      explanation: "方法就是一段有名字的代码块。定义好后，你可以在任何地方通过 `名字()` 来执行它，而不用把代码重写一遍。`void` 表示这个方法不返回任何数据。",
      exampleCode: `// 定义
public static void bark() {
    System.out.println("汪汪!");
}

// 调用
bark();`
    },
    cheatSheet: `public static void 方法名() {
    // 代码
}
// 调用:
方法名();`
  },
  {
    id: 'L12',
    order: 12,
    title: '传声筒',
    topic: '方法参数',
    difficulty: 'Hard',
    description: '方法可以接收数据。这就像给微波炉设置时间一样。',
    task: '定义 `greet` 方法接收一个 String 参数 `name`，打印 "Hello " + name。调用 `greet("Java")`。',
    initialCode: `public class Main {
    
    // 定义带参数的方法
    public static void greet(String name) {
        
    }

    public static void main(String[] args) {
        // 调用它，传入 "Java"
        
    }
}`,
    expectedOutput: 'Hello Java',
    hintTopics: ['参数定义', '参数传递', '作用域'],
    learningContent: {
      concept: "方法参数 (Parameters)",
      explanation: "括号里的变量叫“参数”。它是方法工作所需要的原料。定义时写 `(String name)` 表示：“我需要一个字符串，由于不知道具体是什么，我暂时叫它 name”。调用时必须填入具体的值。",
      exampleCode: `public static void doubleNum(int n) {
    System.out.println(n * 2);
}
// 调用
doubleNum(5); // 打印 10`
    },
    cheatSheet: `void 方法名(类型 参数名) { ... }
方法名(具体值);`
  }
];

export const INITIAL_PROGRESS: Record<string, LevelProgress> = {
  'L01': { levelId: 'L01', status: 'UNLOCKED', stars: 0, attempts: 0 },
  'L02': { levelId: 'L02', status: 'LOCKED', stars: 0, attempts: 0 },
  'L03': { levelId: 'L03', status: 'LOCKED', stars: 0, attempts: 0 },
  'L04': { levelId: 'L04', status: 'LOCKED', stars: 0, attempts: 0 },
  'L05': { levelId: 'L05', status: 'LOCKED', stars: 0, attempts: 0 },
  'L06': { levelId: 'L06', status: 'LOCKED', stars: 0, attempts: 0 },
  'L07': { levelId: 'L07', status: 'LOCKED', stars: 0, attempts: 0 },
  'L08': { levelId: 'L08', status: 'LOCKED', stars: 0, attempts: 0 },
  'L09': { levelId: 'L09', status: 'LOCKED', stars: 0, attempts: 0 },
  'L10': { levelId: 'L10', status: 'LOCKED', stars: 0, attempts: 0 },
  'L11': { levelId: 'L11', status: 'LOCKED', stars: 0, attempts: 0 },
  'L12': { levelId: 'L12', status: 'LOCKED', stars: 0, attempts: 0 },
};

export const THEMES: Record<string, Theme> = {
  dark: {
    id: 'dark',
    name: '暗夜深邃',
    price: 0,
    description: '经典的暗色模式，护眼且专注。',
    colors: {
      bgApp: 'bg-slate-900',
      bgPanel: 'bg-slate-800',
      bgEditor: 'bg-[#1e1e1e]',
      textMain: 'text-slate-100',
      textSecondary: 'text-slate-400',
      border: 'border-slate-700',
      accent: 'text-orange-400',
      buttonPrimary: 'bg-indigo-600 hover:bg-indigo-500 text-white',
      buttonSecondary: 'bg-slate-700 hover:bg-slate-600 text-slate-200'
    }
  },
  light: {
    id: 'light',
    name: '清晨明亮',
    price: 0,
    description: '明亮清新的配色，适合白天学习。',
    colors: {
      bgApp: 'bg-slate-50',
      bgPanel: 'bg-white',
      bgEditor: 'bg-slate-900', // Keep editor dark for contrast logic simplicity
      textMain: 'text-slate-800',
      textSecondary: 'text-slate-500',
      border: 'border-slate-200',
      accent: 'text-orange-600',
      buttonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      buttonSecondary: 'bg-slate-200 hover:bg-slate-300 text-slate-700'
    }
  },
  ocean: {
    id: 'ocean',
    name: '深海幽蓝',
    price: 50,
    description: '如深海般的宁静蓝色调。',
    colors: {
      bgApp: 'bg-[#0f172a]', // slate-900 but could be deeper blue
      bgPanel: 'bg-[#1e293b]', // slate-800
      bgEditor: 'bg-[#0b1121]',
      textMain: 'text-blue-50',
      textSecondary: 'text-blue-300',
      border: 'border-blue-800',
      accent: 'text-cyan-400',
      buttonPrimary: 'bg-cyan-600 hover:bg-cyan-500 text-white',
      buttonSecondary: 'bg-blue-900 hover:bg-blue-800 text-blue-200'
    }
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: '赛博朋克',
    price: 150,
    description: '霓虹闪烁的未来都市风格。',
    colors: {
      bgApp: 'bg-[#090014]',
      bgPanel: 'bg-[#1a052e]',
      bgEditor: 'bg-[#0d021c]',
      textMain: 'text-fuchsia-100',
      textSecondary: 'text-fuchsia-400',
      border: 'border-fuchsia-800',
      accent: 'text-yellow-400',
      buttonPrimary: 'bg-fuchsia-600 hover:bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(192,38,211,0.5)]',
      buttonSecondary: 'bg-violet-900 hover:bg-violet-800 text-violet-200'
    }
  },
  matrix: {
    id: 'matrix',
    name: '黑客帝国',
    price: 300,
    description: '进入代码的母体，感受数字雨。',
    colors: {
      bgApp: 'bg-black',
      bgPanel: 'bg-[#0a140a]',
      bgEditor: 'bg-black',
      textMain: 'text-green-400',
      textSecondary: 'text-green-800',
      border: 'border-green-900',
      accent: 'text-green-200',
      buttonPrimary: 'bg-green-700 hover:bg-green-600 text-green-100 border border-green-500 font-mono',
      buttonSecondary: 'bg-black hover:bg-green-900 text-green-600 border border-green-800'
    }
  }
};

export const SYSTEM_INSTRUCTION_JUDGE = `
You are a friendly but strict Java tutor for beginners. 
Your job is to simulate a Java compiler and runtime environment.
User will provide:
1. The Task Goal.
2. The Expected Output.
3. The Java Code.

You must analyze the code and return a JSON response.

IMPORTANT: All "feedback" and "output" explanations MUST be in Simplified Chinese.

Format:
{
  "compiled": boolean, // true if syntax is valid Java
  "success": boolean, // true if it compiles AND meets the task goal exactly
  "output": string, // The console output. If compile error, provide a beginner-friendly Chinese error message.
  "feedback": string // A 1-sentence helpful tip or praise in Chinese.
  "variables": [ { "name": "varName", "type": "int/String", "value": "finalValue" } ] // Extract variables defined in main method
}

Rules:
- If syntax is wrong, "compiled" is false.
- "output" should mimic the real terminal output.
- If it fails, explain WHY simply in "output" (e.g., "第3行缺少分号").
- "feedback" should be encouraging.
- "variables": Parse the code to simulate what variables would exist at the end of execution. Only top-level variables in main.
`;

export const SYSTEM_INSTRUCTION_HINT = `
You are a Java mentor. The student is stuck.
Provide a hint in Simplified Chinese based on the requested Level (1=Concept, 2=Location, 3=Code Fragment).
Keep it short (max 2 sentences).
Do not just give the answer unless it's Level 3.
`;
