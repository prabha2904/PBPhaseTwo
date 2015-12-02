import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class TweetUtil {
public static void main(String[] args) {
	String[] outNames ={"lang","timeZone","time","hashtags"};
	System.out.println(outNames[0]);
	  File folder = new File("C://users//Prabha//Desktop//UtilTest");
	  File[] files = folder.listFiles();
	  System.out.println(files[0].getName());
	    for ( int i=0;i<files.length;i++) {
	            System.out.println(files[i].getName());
	            if(outNames[i].equals("time")){
	            	dateConverter(files[i].getName());
	            }
	            convertFile(files[i].getName(), outNames[i]);   
	        }
	    }
 // To render .csv files required by d3
	 public static void convertFile(String fileName, String outName){
         try
             {
        	 String fPath ="C://users//Prabha//Desktop//UtilTest//"+fileName;
        	 System.out.println(fPath);
             File file = new File(fPath);
             BufferedReader reader = new BufferedReader(new FileReader(file));
             String line = "";
             String oldtext="";
            		 if(outName.equals("hashtags")){
            			 oldtext="text,size"+"\n";
            		 }else{
            		 oldtext = "key,value"+"\n";
            		 }
             while((line = reader.readLine()) != null)
                 {
                 oldtext += line + "\n";
             }
             reader.close();

             String replacedtext  = oldtext.replaceAll("\\(", "" );
             replacedtext = replacedtext.replaceAll("\\)", "" );
             
             FileWriter writer = new FileWriter("C://users//Prabha//Desktop//output//"+outName+".txt");
             writer.write(replacedtext);
             writer.close();
         }
         catch (IOException ioe)
             {
             ioe.printStackTrace();
         }
	 }
	 
	 // To convert the twitter date to date supported by D3
	 public static void dateConverter(String fileName){
		 try
         {
    	 String fPath ="C://users//Prabha//Desktop//UtilTest//"+fileName;
    	 System.out.println("in date converter"+fileName);
    	 System.out.println(fPath);
         File file = new File(fPath);
         BufferedReader reader = new BufferedReader(new FileReader(file));
         String line = "", oldtext = "";
         while((line = reader.readLine()) != null)
             {
        	String[] columns= line.split(",");
        	String[] sth = columns[0].split(" ");
        	
        	 line=sth[3]+","+columns[1];
        	
             oldtext += line + "\n";
         }
         reader.close();

         String replacedtext  = oldtext.replaceAll("\\(", "" );
         replacedtext = replacedtext.replaceAll("\\)", "" );
         
         FileWriter writer = new FileWriter("C://users//Prabha//Desktop//UtilTest//"+fileName);
         writer.write(replacedtext);
         writer.close();

     }
     catch (IOException ioe)
         {
         ioe.printStackTrace();
     }
		
	 }
}

