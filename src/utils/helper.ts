export function getid(s:string)
{
    let ans="";
    for(let i=s.length-2;i>=0;i--)
    {
        if(s[i]=='/') break;
        ans+=s[i];
    }
    return ans.split('').reverse().join('');
}
