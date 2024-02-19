import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service'
import { LoginService } from '../login-servic.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  
  isSuperAdmin = false;
  isNormalAdmin = false;
  isNormalUser = false;
  itarbs: boolean = false;
  
  constructor(
    private authService: AuthenticationService,
    private loginService: LoginService,

  )
  {
    this.authService.userRoles$.subscribe((roles) => {
      // // console.log(roles);
      
      this.isSuperAdmin = roles.includes('SuperAdmin');
      this.isNormalAdmin = roles.includes('Admin');
      this.isNormalUser = roles.includes('User');
    });
    this.loginService.iseng$.subscribe((iseng: boolean) => {
      this.itarbs = iseng;
    })
    
  }
  getthetxet() 
  {
    if (!this.itarbs) {
      return `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam sunt reprehenderit sint libero nisi beatae deserunt iure officiis nesciunt consequatur. Fugit aut dolores totam blanditiis doloribus possimus reiciendis accusamus incidunt. Aliquam repellat, assumenda ipsum minima animi, facilis dolorem debitis tempore aspernatur fugiat hic porro distinctio voluptate a unde neque natus explicabo perferendis vitae dolores beatae! Earum dignissimos vel eveniet necessitatibus odit quis impedit blanditiis reiciendis laboriosam itaque inventore, nisi rerum. Officia rem, doloribus fugiat sapiente aut aspernatur aliquid quibusdam suscipit consequatur maiores facere quasi officiis amet laborum eum maxime commodi reiciendis animi sit enim! Cumque, vel? Explicabo numquam quibusdam, recusandae id esse quo porro possimus. Totam, incidunt odio iusto voluptatem maxime deleniti qui ab quis tenetur rerum nihil praesentium aut ea blanditiis ipsam labore deserunt cupiditate! Culpa earum assumenda fuga similique placeat officia accusantium ex, unde quisquam, repudiandae quidem nisi dignissimos nam molestias voluptatum magnam doloribus veritatis quod cum. Suscipit adipisci ipsa temporibus magni velit voluptatibus illum voluptates esse ad voluptatum quidem reiciendis officia pariatur saepe maiores, eius, enim, dolore minus. Illo iste recusandae facilis velit cumque quam deserunt veritatis minus reprehenderit pariatur harum tempore provident id eius et quisquam neque a, tempora doloribus voluptatibus quia maiores itaque reiciendis. Amet aliquam laudantium debitis harum, rerum id explicabo! Commodi, odit rerum, adipisci obcaecati tenetur architecto ipsa veritatis non nam quis fuga culpa? Velit laboriosam similique eos dolore iure, consequuntur dolores, accusamus corporis assumenda reprehenderit quis inventore mollitia nesciunt architecto maiores accusantium! Quidem, dicta dolore quis ipsam laboriosam non veniam, voluptates iste culpa autem dolorum eaque assumenda mollitia, laborum tempora molestiae soluta placeat commodi. Officiis repellendus ratione hic. Reiciendis, sed soluta nam quod, cumque nobis sunt consectetur ab aspernatur hic sint aliquid sapiente, fugiat quis possimus voluptate architecto nesciunt veritatis aliquam culpa. Atque corrupti quam debitis nam delectus aperiam labore, laborum ad animi vero voluptates temporibus eveniet totam deserunt sequi quisquam esse natus exercitationem fugiat rem mollitia autem corporis quia dolorem? Ipsa voluptates enim voluptate tempora libero totam ipsum rerum adipisci animi aut blanditiis beatae impedit quo explicabo, reprehenderit laborum voluptatum quaerat neque quos accusantium repellendus nihil deleniti, commodi aliquid? Maxime quaerat officiis facilis nesciunt quam animi aperiam sed quos praesentium, in iste consequuntur minima blanditiis beatae consequatur laborum, recusandae et voluptate. Iste fugit quos ipsam tempora, quisquam in provident itaque minus dolor nemo vitae quas error, magnam amet ipsum expedita incidunt? A et, neque est nulla voluptas eveniet id iusto quos voluptate pariatur odio eos molestiae soluta cupiditate, fugit deleniti porro. Itaque porro cupiditate deserunt doloribus reprehenderit laborum quas officia nostrum minima obcaecati autem atque fugit vitae aperiam, distinctio dolores assumenda sed dolore quia! Odit ipsum ipsam voluptatibus fugit deleniti quos eveniet vel at harum esse error dolores quidem, saepe adipisci velit corrupti similique iusto nihil temporibus ipsa eius nostrum nulla. Sapiente fugiat quaerat illo quasi delectus? Odit placeat possimus suscipit praesentium distinctio iure hic consequatur officia beatae provident. Qui molestiae odio veritatis voluptate, reprehenderit explicabo dolor voluptates, cumque suscipit at minima, tempore quaerat nihil sit possimus totam illum cum laboriosam.`
    }
    else{
      return ` بسم الله الرحمن الرحيم

      اللغة العربية هي إحدى أجمل اللغات في العالم، وهي لغة القرآن الكريم وثقافة عريقة تمتد لآلاف السنين. تُعتبر اللغة العربية من أقدم اللغات التي ظهرت على وجه الأرض، وهي لغةٌ رائعة ومعقدة في آن واحد. تتميز اللغة العربية بنظامها الدقيق للنحو والصرف والوزن، مما يجعلها تُعتبر مليئة بالقواعد والقوانين اللغوية.
      
      تتميز اللغة العربية بغناها بالمفردات والمصطلحات التي تصف المفاهيم والأفكار بشكل دقيق ودون أدنى الغموض. تُعد الشعر والأدب العربي من أبرز العوامل التي أسهمت في إثراء هذه اللغة، حيث قدم الشعراء والكُتَّاب العديد من الأعمال الأدبية التي تعتبر من بين أعظم الأعمال في التاريخ.
      
      اللغة العربية لها تأثير واسع النطاق في العديد من الثقافات واللغات الأخرى، حيث تُدرَّس وتُتعلم في جميع أنحاء العالم، وتُعتبر من لغات الاتصال الدولي. تتسم اللغة العربية بجمالها وقوتها التعبيرية، وتُعتبر موردًا هائلًا للمعرفة والثقافة في العديد من المجالات.
      
      تُعتبر اللغة العربية أحد العناصر الرئيسية للهوية والثقافة العربية، وهي تعكس تاريخًا حافلًا بالإنجازات والتطور. تحتوي اللغة العربية على تنوع كبير من اللهجات واللهجات الإقليمية التي تعكس تنوع الشعوب والثقافات في العالم العربي.
      
      في النهاية، تُعتبر اللغة العربية لغة الفهم والتواصل بين شعوب العالم، وهي جسر تواصل بين الأجيال المختلفة. إن فهمها وتعلمها يعطي روادها دخولًا إلى عالمٍ من الثقافة والتراث العريق، مما يجعلها لغةً مميزة وقيّمة في تاريخ البشرية. `
    }
  }


  ngOnInit(): void {

    this.authService.userRoles$.subscribe((roles) => {
      // // console.log(roles);
      
      this.isSuperAdmin = roles.includes('SuperAdmin');
      this.isNormalAdmin = roles.includes('Admin');
      this.isNormalUser = roles.includes('User');
    });
  }




  Array_FormGroup1 = [
    {
      label_Content : 'Edit Name',
      label_Contentar : 'تغيير الاسم',
      ngif : `this.isNormalAdmin` ,
      routerLink : `/home/changeName`,
    },
    {
      label_Content : 'Change Password',
      label_Contentar : 'تغيير كلمه السر',
      ngif : `this.isNormalAdmin` ,
      routerLink : `/home/changePassword`,
    },
    // {
    //   label_Content : 'Reset Password',
    //   label_Contentar : 'اعادة ضبط كلمه السر',
    //   ngif : `this.isSuperAdmin` ,
    //   routerLink : `/home/restpassword`,
    // },
  ]
}
