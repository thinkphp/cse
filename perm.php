<?php

    echo"<h1>Permutation 3!=6</h1>";

    $n = 4;

    function init() {

        global $st,$k;

        $st[$k] = 0;
    }    

    function have_successor() {

        global $st,$k,$n;

        if($st[$k]<$n) {

           $st[$k]++;

           return 1; 

        } else {

           return 0;
        }     
    }

    function is_valid() {

       global $st,$k; 

       for($i=1;$i<$k;$i++) {

            if($st[$i] == $st[$k]) return 0;
       }  

      return 1;
    }
   

    function display() {

         global $st,$n;

         for($i=1;$i<=$n;$i++) {

             echo$st[$i].' '; 
         }

         echo"<br/>";
    }  

    function solution() {

        global $k,$n;

        return ($k==$n); 
    }

    function back() {

         global $k;

         $k=1;init();

         while($k>0) {

               do{} while( ($AS=have_successor()) && (!is_valid()) ); 

               if($AS) {

                  if(solution()) {

                     display();

                  } else {$k++;init();}

               } else {

                 $k--; 
               }

         }//end while
    }
 
    back();
   
?>