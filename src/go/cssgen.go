package main

import (
    // "log"
    // "os"
    // "strings"
    // "io/ioutil"
    "flag"
    "fmt"
    "net/http"
    "golang.org/x/net/html"
)


func addTag(m map[int]string) string {
   s := "";
   j := len(m)
   for i := 0; i < j; i++ {
      s = s + " " + string(m[i])
   }
   return s
}

func isSelfClosing(tagName string) bool {
   // todo html.SelfClosingTagToken does not recognize unclosed tags: <img> or <hr>, use selfClosingTags
   switch tagName {
   case "area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr":
      return true
   }
   return false
}

func main() {

   // cli arguments
   // remote URL
   remoteUrl := flag.String("url", "not_set", "loads a remote url")

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

   css := make(map[int]string)
   foundBodyTag := false
   unclosedTagFound := false
   finalCss := ""

   // ErrorToken  error during tokenization (or end of document)
   // TextToken   text node (contents of an element)
   // StartTagToken  example <a>
   // EndTagToken example </a>
   // SelfClosingTagToken  example <br/>
   // CommentToken   example <!-- Hello World -->
   // DoctypeToken   example <!DOCTYPE html>
   z := html.NewTokenizer(resp.Body)
   for {
      tt := z.Next()


      if tt == html.StartTagToken || tt == html.SelfClosingTagToken {
         tn, _ := z.TagName()
         tagName := string(tn);
         if isSelfClosing(tagName) {
            unclosedTagFound = true
         } else {
            unclosedTagFound = false
         }
         if tagName == "body" || foundBodyTag {
            foundBodyTag = true
            css[len(css)] = tagName
         }
      }

      if foundBodyTag && (tt == html.EndTagToken || tt == html.SelfClosingTagToken || unclosedTagFound) {
         finalCss = finalCss + addTag(css) + " { } \n"
         delete(css, len(css)-1)
      }

      if tt == html.ErrorToken {
         resp.Body.Close()
         fmt.Println(finalCss);
         return
      }
   }

}
