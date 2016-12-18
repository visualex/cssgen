package main

import (
    // "log"
    // "os"
    // "strings"
    "io/ioutil"
    "flag"
    "fmt"
    "net/http"
    "golang.org/x/net/html"
)

func getTag() {}

func main() {

   // cli arguments
   // remote URL
   remoteUrl := flag.String("url", "not_set", "loads a remote url")
   boolSource := flag.Bool("source", false, "show html")
   flag.Parse()
   if *remoteUrl == "not_set" {
      fmt.Println("please add a remote URL to load to -url flag");
      return;
   }

   resp, err := http.Get(*remoteUrl)
   if err != nil {
      fmt.Println("Could not fetch: " + *remoteUrl);
      return;
   }
   defer resp.Body.Close()

   if *boolSource {
      body, err := ioutil.ReadAll(resp.Body)
      if err != nil {
         fmt.Println("Could not read: " + *remoteUrl);
         return;
      }
      htmlToParse := string(body)
      fmt.Println(htmlToParse);
      return
   }

   // TODO
   css := ""
   z := html.NewTokenizer(resp.Body)
   for {
      tt := z.Next()
      fmt.Printf("%v\n", tt);
      // ErrorToken  error during tokenization (or end of document)
      // TextToken   text node (contents of an element)
      // StartTagToken  example <a>
      // EndTagToken example </a>
      // SelfClosingTagToken  example <br/>
      // CommentToken   example <!-- Hello World -->
      // DoctypeToken   example <!DOCTYPE html>
      if tt == html.ErrorToken {
         return
      }


   }
   resp.Body.Close()

   fmt.Println(css);



}
